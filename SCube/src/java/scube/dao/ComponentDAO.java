package scube.dao;

import java.sql.*;
import java.util.ArrayList;
import scube.entities.Component;

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
                Component component = new Component(rs.getString("componentId"), rs.getString("type"), rs.getInt("page"), 
                        rs.getDouble("x"), rs.getDouble("y"), rs.getDouble("height"), rs.getDouble("width"));
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
}
