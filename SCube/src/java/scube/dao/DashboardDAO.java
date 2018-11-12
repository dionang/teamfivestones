package scube.dao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;

public class DashboardDAO {
    
    public static boolean saveDashboard(int accountId, HashMap<String,ArrayList<String>> components) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("REPLACE INTO dashboard VALUES (?,?,?,?,?,?,?,?,?,?,?)");
            ArrayList<String> barChart = components.get("bar");
            ArrayList<String> lineChart = components.get("line");
            stmt.setInt(1, accountId);
            if (barChart == null){
                stmt.setNull(2, Types.INTEGER);
                stmt.setNull(3, Types.INTEGER);
                stmt.setNull(4, Types.VARCHAR);
                stmt.setNull(5, Types.VARCHAR);
                stmt.setNull(6, Types.VARCHAR);
            } else {
                stmt.setInt(2, Integer.parseInt(barChart.get(0)));
                stmt.setInt(3, Integer.parseInt(barChart.get(1)));
                stmt.setString(4, barChart.get(2));
                stmt.setString(5, barChart.get(3));
                stmt.setString(6, barChart.get(4));
            }
            
            if (lineChart == null){
                stmt.setNull(7, Types.INTEGER);
                stmt.setNull(8, Types.INTEGER);
                stmt.setNull(9, Types.VARCHAR);
                stmt.setNull(10, Types.VARCHAR);
                stmt.setNull(11, Types.VARCHAR);
            } else {
                stmt.setInt(7, Integer.parseInt(lineChart.get(0)));
                stmt.setInt(8, Integer.parseInt(lineChart.get(1)));
                stmt.setString(9, lineChart.get(2));
                stmt.setString(10, lineChart.get(3));
                stmt.setString(11, lineChart.get(4));
            }
            
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    } 
 
    public static HashMap<String,ArrayList<String>> loadDashboard(int accountId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * FROM dashboard WHERE accountId = ?");
            stmt.setInt(1, accountId);
            rs = stmt.executeQuery();
            
            HashMap<String,ArrayList<String>> components = new HashMap<>();
            if(rs.next()){
                ArrayList<String> barChart = new ArrayList<>();
                barChart.add(rs.getInt("barChartDatasourceId")+"");
                barChart.add(rs.getInt("barChartDatasetId")+"");
                barChart.add(rs.getString("barChartTitle"));
                barChart.add(rs.getString("barChartXAxis"));
                barChart.add(rs.getString("barChartYAxis"));
                
                ArrayList<String> lineChart = new ArrayList<>();
                lineChart.add(rs.getInt("lineChartDatasourceId")+"");
                lineChart.add(rs.getInt("lineChartDatasetId")+"");
                lineChart.add(rs.getString("lineChartTitle"));
                lineChart.add(rs.getString("lineChartXAxis"));
                lineChart.add(rs.getString("lineChartYAxis"));
                
                components.put("bar", barChart);
                components.put("line", lineChart);
                
            }
            return components;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

    }
    
     public static boolean deleteListOption(int datasetId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM listoption WHERE datasetId = ?");
            stmt.setInt(1, datasetId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

    }
      public static boolean deleteListOptionById(int listId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM listoption WHERE listId = ?");
            stmt.setInt(1, listId);
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
