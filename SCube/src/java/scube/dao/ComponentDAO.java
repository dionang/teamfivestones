package scube.dao;

import java.sql.*;
import java.util.ArrayList;
import scube.entities.Component;
import scube.entities.Textbox;
import scube.entities.Chart;
import scube.entities.Image;

public class ComponentDAO {
    //Create operations
    public static boolean saveComponents(ArrayList<Component> components, int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        // if no components to save
        if(components.isEmpty()){
            return false;
        }
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO component VALUES (?,?,?,?,?,?,?)");
            
            // repeat the adding of multiple components into a single batch execute
            for(int i=0; i<components.size(); i++) {
                Component component = components.get(i);
                stmt.setInt(1, templateId);                
                stmt.setInt(2, i);
                stmt.setString(3, component.getType());
                stmt.setInt(4, component.getX());
                stmt.setInt(5, component.getY());
                stmt.setInt(6, component.getHeight());
                stmt.setInt(7, component.getWidth());
                stmt.addBatch();
                
                if(component.getType().equals("text")){
                    Textbox textbox = (Textbox) component;
                    addTextbox(templateId, i, textbox.getText());
                } else if (component.getType().equals("bar") || component.getType().equals("line")) {
                    Chart chart = (Chart) component;
                    addChart(templateId, i, chart.getDatasourceUrl(), chart.getDataset(), chart.getTitle(), chart.getXAxis(), chart.getYAxis(), chart.getAggregate());
                } else if (component.getType().equals("image")) {
                    Image image = (Image) component;
                    addImage(templateId, i, image.getImageData());
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
    
    public static void addChart(int templateId, int position, String datasourceUrl, String dataset, String title, String xAxis, String yAxis, String aggregate) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO chart VALUES (?,?,?,?,?,?,?,?)");
            stmt.setInt(1, templateId);
            stmt.setInt(2, position);            
            stmt.setString(3, datasourceUrl);            
            stmt.setString(4, dataset);
            stmt.setString(5, title);
            stmt.setString(6, xAxis);
            stmt.setString(7, yAxis);            
            stmt.setString(8, aggregate);

            stmt.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace(System.out);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static void addImage(int templateId, int position, byte[] imageData) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO image VALUES (?,?,?)");
            stmt.setInt(1, templateId);
            stmt.setInt(2, position);            
            stmt.setBytes(3, imageData);
            stmt.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace(System.out);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static void addTextbox(int templateId, int position, String text) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO textbox VALUES (?,?,?)");
            stmt.setInt(1, templateId);
            stmt.setInt(2, position);            
            stmt.setString(3, text);

            stmt.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace(System.out);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
        
    // Read operations
    public static ArrayList<Component> loadComponentsFromTemplate(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from component WHERE templateId = ?");
            stmt.setInt(1, templateId);
            rs = stmt.executeQuery();
            
            ArrayList<Component> components = new ArrayList<>();
            int position = 0;
            while(rs.next()){
                Component component = null;
                String type = rs.getString("type");
                if(type.equals("text")){
                    component = new Textbox(type, rs.getInt("x"), rs.getInt("y"), 
                        rs.getInt("height"), rs.getInt("width"), getTextboxText(templateId, position));
                } else if (type.equals("line") || type.equals("bar")){
                    ArrayList<String> props = getChartProps(templateId, position);
                    component = new Chart(type, rs.getInt("x"), rs.getInt("y"), 
                        rs.getInt("height"), rs.getInt("width"), props.get(0), props.get(1), props.get(2), props.get(3), props.get(4), props.get(5));
                }
                components.add(component);
                position++;
            }
            return components;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static String getTextboxText(int templateId, int position) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT text FROM textbox WHERE templateId = ? and position = ?");
            stmt.setInt(1, templateId);
            stmt.setInt(2, position);
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
    
    public static String getImageData(int templateId, int position) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT text FROM textbox WHERE templateId = ? and position = ?");
            stmt.setInt(1, templateId);
            stmt.setInt(2, position);
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
    
    public static ArrayList<String> getChartProps(int templateId, int position) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        ArrayList<String> props = new ArrayList<>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * FROM chart WHERE templateId = ? and position = ?");
            stmt.setInt(1, templateId);
            stmt.setInt(2, position);
            rs = stmt.executeQuery();

            if(rs.next()){
                props.add(rs.getString("datasourceUrl"));
                props.add(rs.getString("dataset"));
                props.add(rs.getString("title"));
                props.add(rs.getString("xAxis"));
                props.add(rs.getString("yAxis"));                
                props.add(rs.getString("aggregate"));
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
    public static boolean deleteComponent(int templateId, int position) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM component WHERE templateId = ? and position = ?");
            stmt.setInt(1, templateId);
            stmt.setInt(2, position);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
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
}
