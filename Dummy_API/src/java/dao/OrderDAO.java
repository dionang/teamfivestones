package dao;

import entities.Order;
import java.sql.*;
import java.util.ArrayList;

public class OrderDAO {
    
    //method to capture all Furnitures from database
    public static ArrayList<String> allFurnitures() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT distinct Category FROM orders");
            rs = stmt.executeQuery();
            ArrayList<String> furnitureList = new ArrayList<>();
            while(rs.next()){
                furnitureList.add(rs.getString("Category"));
            }
            return furnitureList;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    //method to capture all Order ID from database
    public static ArrayList<String> allOrderIDs() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT distinct Order_ID FROM orders order by Order_ID ASC limit 20");
            rs = stmt.executeQuery();
            ArrayList<String> orderIdList = new ArrayList<>();
            while(rs.next()){
                orderIdList.add(rs.getString("Order_ID"));
            }
            return orderIdList;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static ArrayList<Order> getOrdersByCategory(String category) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from orders WHERE Category = ? and row_id < 100");
            stmt.setString(1, category);
            rs = stmt.executeQuery();
            ArrayList<Order> orders = new ArrayList<>();
            while(rs.next()){
                Order order = new Order(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10), rs.getString(11), rs.getInt(12), rs.getString(13), rs.getString(14), rs.getString(15), rs.getString(16), rs.getString(17), rs.getDouble(18), rs.getInt(19), rs.getDouble(20), rs.getDouble(21));
                orders.add(order);     
            }
            return orders;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    //retrieve order date & ship date by using orderID
    public static ArrayList<Order> getShippingInfoByOrderID(String orderID) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * FROM orders WHERE Order_ID = ?");
            stmt.setString(1, orderID);
            rs = stmt.executeQuery();
            ArrayList<Order> orders = new ArrayList<>();
            while(rs.next()){
                Order order = new Order(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10), rs.getString(11), rs.getInt(12), rs.getString(13), rs.getString(14), rs.getString(15), rs.getString(16), rs.getString(17), rs.getDouble(18), rs.getInt(19), rs.getDouble(20), rs.getDouble(21));
                orders.add(order);     
            }
            return orders;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
}
