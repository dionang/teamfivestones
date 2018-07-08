package scube.dao;

import java.sql.*;
import java.util.ArrayList;
import scube.entities.Component;
import scube.entities.Textbox;

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
            stmt = conn.prepareStatement("INSERT INTO component VALUES (?,?,?,?,?,?,?,?)");
            
            // repeat the adding of multiple components into a single batch execute
            for(Component component : components) {
                stmt.setString(1, component.getId());
                stmt.setInt(2, templateId);
                stmt.setString(3, component.getType());
                stmt.setInt(4, component.getPage());
                stmt.setDouble(5, component.getX());
                stmt.setDouble(6, component.getY());
                stmt.setDouble(7, component.getHeight());
                stmt.setDouble(8, component.getWidth());
                stmt.addBatch();
                
                if(component.getType().equals("textbox")){
                    Textbox textbox = (Textbox) component;
                    addTextbox(component.getId(), templateId, textbox.getText());
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
    
    public static void addTextbox(String componentId, int templateId, String text) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO textbox VALUES (?,?,?)");
            stmt.setString(1, componentId);
            stmt.setInt(2, templateId);            
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
            while(rs.next()){
                String type = rs.getString("type");
                Component component;
                if(rs.getString("type").equals("textbox")){
                    component = new Textbox(rs.getString("componentId"), rs.getString("type"), rs.getInt("page"), 
                        rs.getDouble("x"), rs.getDouble("y"), rs.getDouble("height"), rs.getDouble("width"), 
                        getTextboxText(rs.getString("componentId")));
                } else {
                    component = new Component(rs.getString("componentId"), rs.getString("type"), rs.getInt("page"), 
                        rs.getDouble("x"), rs.getDouble("y"), rs.getDouble("height"), rs.getDouble("width"));
                }
                components.add(component);
            }
            return components;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static String getTextboxText(String componentId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * FROM textbox WHERE componentId = ?");
            stmt.setString(1, componentId);
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
    public static boolean deleteComponent(String componentId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM component WHERE componentId = ?");
            stmt.setString(1, componentId);
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
}
