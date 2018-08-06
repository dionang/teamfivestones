package dao;

import entities.CustomerOrder;
import java.sql.*;
import java.util.ArrayList;

public class CustomerOrderDAO {
    public static ArrayList<CustomerOrder> allOrders() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from customerorders");
            rs = stmt.executeQuery();
            ArrayList<CustomerOrder> customerOrderList = new ArrayList<>();
            while(rs.next()){
                CustomerOrder co = new CustomerOrder(rs.getString("customerName"),rs.getInt("customerID"),rs.getDate("purchaseDate"),
                    rs.getDouble("discount"),rs.getInt("age"),rs.getString("gender"),rs.getInt("noOfGoodsBought"),rs.getInt("totalPayment"));
                customerOrderList.add(co);
            }   
            return customerOrderList;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
}
 