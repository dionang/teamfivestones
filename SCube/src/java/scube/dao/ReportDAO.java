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
    public static boolean createTemplate(int companyId, String templateName, String creatorId, String size, String layout) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO template VALUES (?,?,?,?,?,?,?,?)");
            Date date = new Date(System.currentTimeMillis());
            stmt.setNull(1, Types.INTEGER);
            stmt.setInt(2, companyId);
            stmt.setString(3, templateName);
            stmt.setString(4, creatorId);
            stmt.setDate(5, date);
            stmt.setDate(6, date);
            stmt.setString(7, size);
            stmt.setString(8, layout);
            
            stmt.executeUpdate();
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
                        rs.getString("createdBy"), rs.getDate("createdOn"), rs.getDate("lastUpdatedOn"),rs.getString("size"),rs.getString("layout"));
                
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
    
    public static int getTemplatesCreatedByUser(String username) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT count(*) as count FROM `template` WHERE createdBy = ?");
            stmt.setString(1, username);
            rs = stmt.executeQuery();
            
            if(rs.next()){
                return rs.getInt("count");
            }
            return 0;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return 0;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static String retrieveTemplateId() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT templateId from template ORDER BY templateId DESC LIMIT 1;");
            rs = stmt.executeQuery();
            
            if(rs.next()){
                int id=rs.getInt("templateId");
                String templateId=Integer.toString(id);;
                return templateId;
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
    public static boolean updateTemplate(int templateId, String templateName, String size, String layout) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE template SET templateName = ?, size = ?, layout = ?, lastUpdatedOn = ? WHERE templateId = ?");
            Date date = new Date(System.currentTimeMillis());
            stmt.setString(1, templateName);            
            stmt.setString(2, size);            
            stmt.setString(3, layout);            
            stmt.setDate(4, date);            
            stmt.setInt(5, templateId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    // Delete operations
    public static boolean deleteTemplate(int templateId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM template WHERE templateId = ?");
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
