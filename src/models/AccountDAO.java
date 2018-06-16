package models;

import java.sql.*;

public class AccountDAO {
	public static boolean authenticate(String username, String enteredPassword) throws Exception{
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("select * from account where username = ?");
            stmt.setString(1, username);
            rs = stmt.executeQuery();
            
            if(rs.next()){
                String pwHash = rs.getString("passwordHash");
                return pwHash.equals(enteredPassword);
            } else {
                return false;
            }
    
        } catch (SQLException e) {
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
}
