/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import scube.dao.DashboardDAO;

/**
 *
 * @author Dion
 */
@WebServlet(name = "DashboardController", urlPatterns = {"/saveDashboard", "/loadDashboard"})
public class DashboardController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
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
            BufferedReader reader = request.getReader();
            JsonObject json = new JsonParser().parse(reader).getAsJsonObject();
            JsonObject responseObj = new JsonObject();
            String operation = json.get("operation").getAsString();
            int accountId = json.get("accountId").getAsInt();
            if(operation.equals("saveDashboard")){
                JsonArray components = json.getAsJsonArray("components");
                HashMap<String,ArrayList<String>> allComponents = new HashMap<>();
                for(int i=0; i<components.size(); i++){
                    JsonObject componentObj = components.get(i).getAsJsonObject();
                    // "deleted" components that we do not need to save
                    if (!componentObj.get("display").getAsBoolean()){
                        continue;
                    }
                    
                    String type = componentObj.get("type").getAsString();
                    JsonObject properties = componentObj.get("properties").getAsJsonObject();
                    if (properties.get("initialized").getAsBoolean()) {
                        ArrayList<String> component = new ArrayList<>();
                        String datasourceId = properties.get("datasourceId").getAsString();
                        String datasetId = properties.get("datasetId").getAsString();
                        String title = properties.get("title").getAsString();
                        String xAxis = properties.get("xAxis").getAsString();
                        String yAxis = properties.get("yAxis").getAsString();
                        component.add(datasourceId);
                        component.add(datasetId);
                        component.add(title);
                        component.add(xAxis);
                        component.add(yAxis);
                        allComponents.put(type, component);
                    }
                }
                
                boolean status = DashboardDAO.saveDashboard(accountId, allComponents);
                responseObj.addProperty("status", status);
                out.print(responseObj.toString());
                
            } else if (operation.equals("loadDashboard")) {
                HashMap<String,ArrayList<String>> components = DashboardDAO.loadDashboard(accountId);
                ArrayList<String> barChart = components.get("bar");
                ArrayList<String> lineChart = components.get("line");
                
                JsonObject barObj = new JsonObject();
                if (barChart == null || barChart.get(0).equals("0")){
                } else {
                    barObj.addProperty("aggregate", "sum");
                    barObj.addProperty("initialized", true);
                    barObj.addProperty("datasourceId", Integer.parseInt(barChart.get(0)));
                    barObj.addProperty("datasetId", Integer.parseInt(barChart.get(1)));
                    barObj.addProperty("title", barChart.get(2));
                    barObj.addProperty("xAxis", barChart.get(3));
                    barObj.addProperty("yAxis", barChart.get(4));
                    responseObj.add("bar", barObj);
                }
                
                if (lineChart == null || lineChart.get(0).equals("0")){
                } else {
                    JsonObject lineObj = new JsonObject();
                    lineObj.addProperty("aggregate", "sum");
                    lineObj.addProperty("initialized", true);
                    lineObj.addProperty("datasourceId", Integer.parseInt(lineChart.get(0)));
                    lineObj.addProperty("datasetId", Integer.parseInt(lineChart.get(1)));
                    lineObj.addProperty("title", lineChart.get(2));
                    lineObj.addProperty("xAxis", lineChart.get(3));
                    lineObj.addProperty("yAxis", lineChart.get(4));
                    responseObj.add("line", lineObj);
                }
                
                out.print(responseObj.toString());
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
