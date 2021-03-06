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
@WebServlet(name = "CustomerController", urlPatterns = {"/getCustomerInformation"})
public class CustomerController extends HttpServlet {

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
            String custName = request.getParameter("name");

            //retrieve top 30 customer names arranged in ascending order
            ArrayList<String> custNamesList = OrderDAO.allCustomerNames();

            //stores the output Json object
            JsonObject jsonOutput = new JsonObject();

            //used for pretty printing
            Gson gson = new GsonBuilder().setPrettyPrinting().create();

            if (custNamesList.contains(custName)) {

                //retrieve order details by using custName
                ArrayList<Order> custOrderList = OrderDAO.getCustomerOrderDetails(custName);
                
                //JsonArray to capture order details to print out
                JsonArray CustArr = new JsonArray();

                for (Order o : custOrderList) {
                    JsonObject CustDetails = new JsonObject();

                    CustDetails.addProperty("Order ID", o.getOrderID());
                    CustDetails.addProperty("Product Name", o.getProductName());
                    CustDetails.addProperty("Product ID", o.getProductID());
                    CustDetails.addProperty("Category", o.getCategory());
                    CustDetails.addProperty("Sub-Category", o.getCategory());
                    CustDetails.addProperty("Quantity", o.getQty());
                    CustDetails.addProperty("Sales", o.getSales());

                    CustArr.add(CustDetails);
                }

                jsonOutput.addProperty("status", "success");
                jsonOutput.add("Customer Order", CustArr);
                out.println(gson.toJson(jsonOutput));
            } else { //fail case
                
                jsonOutput.addProperty("status", "failed");
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
