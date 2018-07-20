/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import dao.OrderDAO;
import entities.Order;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author HongYuan
 */
@WebServlet(name = "TestController", urlPatterns = {"/getInformationByCategory"})
public class TestController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {

            //to retrieve the request entered from the URL
            String item = request.getParameter("item");
            
            //retrieve test scenarios based on methods written
            ArrayList<String> allFurnitureList = OrderDAO.allFurnitures();
            ArrayList<String> allOrderIDs = OrderDAO.allOrderIDs();

            //check input given by user
            if (allFurnitureList.contains(item)) {
                ArrayList<Order> furnitureList = OrderDAO.getOrdersByCategory(item);

                //stores the output Json object
                JsonObject jsonOutput = new JsonObject();

                //used for pretty printing
                Gson gson = new GsonBuilder().setPrettyPrinting().create();

                JsonArray furnitureArr = new JsonArray();
                for (Order o : furnitureList) {
                    JsonObject furnitureObj = new JsonObject();
                    furnitureObj.addProperty("name", o.getProductName());
                    furnitureObj.addProperty("sales", o.getSales());
                    furnitureObj.addProperty("quantity", o.getQty());
                    furnitureObj.addProperty("discount", o.getDiscount());
                    furnitureObj.addProperty("profit", o.getProfit());
                    furnitureArr.add(furnitureObj);
                }

                jsonOutput.addProperty("status", "success");
                jsonOutput.add("furnitures", furnitureArr);
                out.println(gson.toJson(jsonOutput));
            } else if (allOrderIDs.contains(item)) {
                ArrayList<Order> shippingInfoList = OrderDAO.getShippingInfoByOrderID(item);
                
                //stores the output Json object
                JsonObject jsonOutput = new JsonObject();

                //used for pretty printing
                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                
                JsonArray ShippingInfoArr = new JsonArray();
                for(Order o : shippingInfoList) {
                    JsonObject shippingInfoObj = new JsonObject();
                    shippingInfoObj.addProperty("Product Name", o.getProductName());
                    shippingInfoObj.addProperty("Ordered Date", o.getOrderDate());
                    shippingInfoObj.addProperty("Shipped Out Date", o.getShipDate());
                    shippingInfoObj.addProperty("Ship Type", o.getShipMode());
                    ShippingInfoArr.add(shippingInfoObj);
                }
                
                jsonOutput.addProperty("status", "success");
                jsonOutput.add("Shipping Information", ShippingInfoArr);
                out.println(gson.toJson(jsonOutput));
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
