/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import scube.entities.Template;

/**
 *
 * @author Dion
 */
public class ReportDAO {
    //Create operations
    public static boolean createTemplate(int companyId, String templateName, int creatorId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO template VALUES (?,?,?,?,?)");
            
            Date date = new Date(System.currentTimeMillis());
            stmt.setNull(1, Types.INTEGER);
            stmt.setInt(2, companyId);
            stmt.setString(3, templateName);
            stmt.setInt(4, creatorId);
            stmt.setDate(5, date);
            stmt.setDate(6, date);

            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
        
    // Read operations
    public static ArrayList<Template> retrieveAllTemplatesByCompany(int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from template WHERE companyId = ?");
            stmt.setInt(1, companyId);
            rs = stmt.executeQuery();
            
            ArrayList<Template> templates = new ArrayList<>();
            while(rs.next()){
                Template template = new Template(rs.getInt("templateId"), rs.getInt("companyId"), rs.getString("templateName"), 
                        rs.getInt("createdBy"), rs.getDate("createdOn"), rs.getDate("lastUpdatedOn"));
                
                templates.add(template);
            }
            return templates;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static Template retrieveTemplateById(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from template WHERE templateId = ?");
            stmt.setInt(1, templateId);
            rs = stmt.executeQuery();
            
            if(rs.next()){
                Template template = new Template(rs.getInt("templateId"), rs.getInt("companyId"), rs.getString("templateName"), 
                        rs.getInt("createdBy"), rs.getDate("createdOn"), rs.getDate("lastUpdatedOn"));
                
                return template;
            }
            return null;
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
//    public static boolean deleteComponent(String componentId) {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement("DELETE FROM component WHERE componentId = ?");
//            stmt.setString(1, componentId);
//            stmt.executeUpdate();
//            return true;
//        } catch (SQLException e) {
//            e.printStackTrace(System.out);
//            return false;
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//    }
   
}