package scube.dao;

import java.sql.*;
import java.util.ArrayList;
import scube.entities.Component;
import scube.entities.Textbox;
import scube.entities.Chart;
import scube.entities.Image;

public class ComponentDAO {
    //Create operations
    public static boolean saveComponents(ArrayList<ArrayList<Component>> allComponents, int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        // if no components to save
        if(allComponents.isEmpty()){
            return false;
        }
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO component VALUES (?,?,?,?,?,?,?,?)");
            
            // repeat the adding of multiple components into a single batch execute
            for(int page=0; page<allComponents.size(); page++) {
                ArrayList<Component> components = allComponents.get(page);
                for(int i=0; i<components.size(); i++) {
                    Component component = components.get(i);
                    stmt.setInt(1, templateId);                
                    stmt.setInt(2, page);                    
                    stmt.setInt(3, i);
                    stmt.setString(4, component.getType());
                    stmt.setInt(5, component.getX());
                    stmt.setInt(6, component.getY());
                    stmt.setInt(7, component.getHeight());
                    stmt.setInt(8, component.getWidth());
                    stmt.addBatch();

                    switch (component.getType()) {
                        case "text":
                            Textbox textbox = (Textbox) component;
                            addTextbox(templateId, page, i, textbox.getText());
                            break;
                        case "bar":
                        case "line":
                            Chart chart = (Chart) component;
                            addChart(templateId, page, i, chart.getDatasourceUrl(), chart.getPath(), chart.getTitle(), chart.getXAxis(), chart.getYAxis(), chart.getAggregate(), chart.getSummary());
                            break;
                        case "image":
                            Image image = (Image) component;
                            addImage(templateId, page, i, image.getImagePrefix(), image.getImageData());
                            break;
                        default:
                            break;
                    }
                }
            }
            stmt.executeBatch();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static void addChart(int templateId, int page, int position, String datasourceUrl, String path, String title, String xAxis, String yAxis, String aggregate, boolean summary) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO chart VALUES (?,?,?,?,?,?,?,?,?,?)");
            stmt.setInt(1, templateId);
            stmt.setInt(2, page);            
            stmt.setInt(3, position);            
            stmt.setString(4, datasourceUrl);            
            stmt.setString(5, path);
            stmt.setString(6, title);
            stmt.setString(7, xAxis);
            stmt.setString(8, yAxis);            
            stmt.setString(9, aggregate);
            stmt.setBoolean(10, summary);

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(System.out);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static void addImage(int templateId, int page, int position, String imagePrefix, byte[] imageData) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO image VALUES (?,?,?,?,?)");
            stmt.setInt(1, templateId);
            stmt.setInt(2, page);            
            stmt.setInt(3, position);            
            stmt.setString(4, imagePrefix);
            stmt.setBytes(5, imageData);
                        
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(System.out);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static void addTextbox(int templateId, int page, int position, String text) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO textbox VALUES (?,?,?,?)");
            stmt.setInt(1, templateId);
            stmt.setInt(2, page);            
            stmt.setInt(3, position);            
            stmt.setString(4, text);

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(System.out);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
        
    // Read operations
    public static ArrayList<ArrayList<Component>> loadComponentsFromTemplate(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from component WHERE templateId = ? ORDER BY page, position");
            stmt.setInt(1, templateId);
            rs = stmt.executeQuery();
            
            // counter to keep track of the page of the previous component
            // upon page change, create a new arraylist
            int prevPage = -1;
            ArrayList<ArrayList<Component>> allComponents = new ArrayList<>();
            ArrayList<Component> components = new ArrayList<>();
            while(rs.next()){
                Component component = null;
                int page = rs.getInt("page");
                int position = rs.getInt("position");
                String type = rs.getString("type");
                if(type.equals("text")){
                    component = new Textbox(type, rs.getInt("x"), rs.getInt("y"), 
                        rs.getInt("height"), rs.getInt("width"), getTextboxText(templateId, page, position));
                } else if (type.equals("line") || type.equals("bar")){
                    ArrayList<String> props = getChartProps(templateId, page, position);
                    component = new Chart(type, rs.getInt("x"), rs.getInt("y"), 
                        rs.getInt("height"), rs.getInt("width"), props.get(0), props.get(1), props.get(2), props.get(3), props.get(4), props.get(5), props.get(6).equals("true"));
                } else if (type.equals("image")) {
                    component = new Image(type, rs.getInt("x"), rs.getInt("y"), rs.getInt("height"), rs.getInt("width"), 
                        getImagePrefix(templateId, page, position), getImageData(templateId, page, position));
                }
                
                // if next page, add existing list to allComponents and reset the components list
                if (prevPage != page && prevPage != -1) {
                    allComponents.add(components);
                    components = new ArrayList<>();
                }
                
                prevPage = page;
                components.add(component);
            }

            // add the last page of components in
            allComponents.add(components);
            return allComponents;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static String getTextboxText(int templateId, int page, int position) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT text FROM textbox WHERE templateId = ? and page = ? and position = ?");
            stmt.setInt(1, templateId);
            stmt.setInt(2, page);
            stmt.setInt(3, position);
            rs = stmt.executeQuery();

            if(rs.next()){
                return rs.getString("text");
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static String getImagePrefix(int templateId, int page, int position) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT imagePrefix FROM image WHERE templateId = ? and page = ? and position = ?");
            stmt.setInt(1, templateId);
            stmt.setInt(2, page);
            stmt.setInt(3, position);
            rs = stmt.executeQuery();

            if(rs.next()){
                return rs.getString("imagePrefix");
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static byte[] getImageData(int templateId, int page, int position) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT imageData FROM image WHERE templateId = ? and page = ? and position = ?");
            stmt.setInt(1, templateId);
            stmt.setInt(2, page);
            stmt.setInt(3, position);
            rs = stmt.executeQuery();

            if(rs.next()){
                return rs.getBytes("imageData");
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static ArrayList<String> getChartProps(int templateId, int page, int position) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        ArrayList<String> props = new ArrayList<>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * FROM chart WHERE templateId = ? and page = ? and position = ?");
            stmt.setInt(1, templateId);
            stmt.setInt(2, page);
            stmt.setInt(3, position);
            rs = stmt.executeQuery();

            if(rs.next()){
                props.add(rs.getString("datasourceUrl"));
                props.add(rs.getString("path"));
                props.add(rs.getString("title"));
                props.add(rs.getString("xAxis"));
                props.add(rs.getString("yAxis"));                
                props.add(rs.getString("aggregate"));
                props.add(""+rs.getBoolean("summary"));
                return props;
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
        public static int getPageNoByTemplateId(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT max(page) as pageNo FROM component WHERE templateId = ? ");
            stmt.setInt(1, templateId);
            rs = stmt.executeQuery();

            if(rs.next()){
               return rs.getInt("pageNo");
            } else {
                return -1;
            }
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return -1;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    // Update operations
//    public static boolean changePassword(int accountId, String newPassword) {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement("UPDATE account SET passwordHash = ? WHERE accountId = ?");
//            stmt.setString(1, passwordHash);            
//            stmt.setInt(2, accountId);
//            stmt.executeUpdate();
//            return true;
//        } catch (SQLException e) {
//            e.printStackTrace(System.out);
//            return false;
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//    }
    
    // Delete operations
    public static boolean deleteAllComponents(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM component WHERE templateId = ?");
            stmt.setInt(1, templateId);
            stmt.executeUpdate();
            
            //delete components from the other tables as well
            deleteAllCharts(templateId);            
            deleteAllTextboxes(templateId);            
            deleteAllImages(templateId);

            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static boolean deleteAllTextboxes(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM textbox WHERE templateId = ?");
            stmt.setInt(1, templateId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static boolean deleteAllCharts(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM chart WHERE templateId = ?");
            stmt.setInt(1, templateId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static boolean deleteAllImages(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM image WHERE templateId = ?");
            stmt.setInt(1, templateId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
}
