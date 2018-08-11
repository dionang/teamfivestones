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
import java.util.Base64;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import scube.dao.ComponentDAO;
import scube.entities.Component;
import scube.entities.Textbox;
import scube.entities.Chart;
import scube.entities.Image;

/**
 *
 * @author Dion
 */
@WebServlet(name = "ComponentController", urlPatterns = {"/saveComponents", "/loadComponents"})
public class ComponentController extends HttpServlet {

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
        try (PrintWriter out = response.getWriter()) {
            // read the request, have to use BufferedReader because json data is binary
            BufferedReader reader = request.getReader();
            JsonObject json = new JsonParser().parse(reader).getAsJsonObject();
            JsonObject responseObj = new JsonObject();
            String operation = json.get("operation").getAsString();
            int templateId = json.get("templateId").getAsInt();
            if(operation.equals("saveComponents")){
                JsonArray arr = json.getAsJsonArray("components");
                ArrayList<Component> components = new ArrayList<>();
                for(int i=0; i<arr.size();i++){
                    JsonObject componentObj = arr.get(i).getAsJsonObject();
                    // "deleted" components that we do not need to save
                    if (!componentObj.get("display").getAsBoolean()){
                        continue;
                    }
                    
                    String type = componentObj.get("type").getAsString();
                    int x = componentObj.get("x").getAsInt();
                    int y = componentObj.get("y").getAsInt();
                    int height = componentObj.get("height").getAsInt();
                    int width = componentObj.get("width").getAsInt();
                    
                    JsonObject properties = componentObj.get("properties").getAsJsonObject();
                    if (type.equals("text")){
                        String text = properties.get("text").getAsString();
                        components.add(new Textbox(type, x, y, height, width, text));
                    } else if (type.equals("bar") || type.equals("line")){
                        boolean initialized = properties.get("initialized").getAsBoolean();                        
                        String datasourceUrl = properties.get("datasourceUrl").getAsString();
                        String dataset = properties.get("dataset").getAsString();
                        String title = properties.get("title").getAsString();
                        String xAxis = properties.get("xAxis").getAsString();
                        String yAxis = properties.get("yAxis").getAsString();
                        String aggregate = properties.get("aggregate").getAsString();
                        
                        if(initialized){
                            components.add(new Chart(type, x, y, height, width, datasourceUrl, dataset, title, xAxis, yAxis, aggregate));
                        }
                    } else if (type.equals("image")) {
                        String imageUrl = properties.get("imageUrl").getAsString();
                        int comma = imageUrl.indexOf(",");
                        String imagePrefix = imageUrl.substring(0,comma);  
                        byte[] imageData = Base64.getMimeDecoder().decode(imageUrl.substring(comma));

                        components.add(new Image(type, x, y, height, width, imagePrefix, imageData));
                    }
                }
                
                // remove existing data of the template, if exists
                ComponentDAO.deleteAllComponents(templateId);
                boolean status = ComponentDAO.saveComponents(components, templateId);
                responseObj.addProperty("status", status);
                out.println(responseObj.toString());
                
            } else if (operation.equals("loadComponents")) {
                ArrayList<Component> components = ComponentDAO.loadComponentsFromTemplate(templateId);
                System.out.println("successfully retrieved from DB");
                JsonArray jsonArr = new JsonArray();
                for(Component component : components){
                    JsonObject componentObj = new JsonObject();
                    componentObj.addProperty("display", true);
                    componentObj.addProperty("type", component.getType());
                    componentObj.addProperty("x", component.getX());
                    componentObj.addProperty("y", component.getY());
                    componentObj.addProperty("height", component.getHeight());
                    componentObj.addProperty("width", component.getWidth());                    
                    
                    JsonObject properties = new JsonObject();
                    if(component.getType().equals("text")){
                        Textbox textbox = (Textbox) component;
                        properties.addProperty("text", textbox.getText());
                    } else if (component.getType().equals("bar") || component.getType().equals("line")) {
                        Chart chart = (Chart) component;
                        properties.addProperty("initialized", true);
                        properties.addProperty("datasourceUrl", chart.getDatasourceUrl());
                        properties.addProperty("dataset", chart.getDataset());
                        properties.addProperty("title", chart.getTitle());
                        properties.addProperty("xAxis", chart.getXAxis());
                        properties.addProperty("yAxis", chart.getYAxis());                        
                        properties.addProperty("aggregate", chart.getAggregate());
                    } else if (component.getType().equals("image")){
                        Image image = (Image) component;
                        String imageUrl = image.getImagePrefix() + "," + Base64.getMimeEncoder().encodeToString(image.getImageData());
                        properties.addProperty("imageUrl", imageUrl);
                    }
                    
                    componentObj.add("properties", properties);

                    // add component to jsonArr
                    jsonArr.add(componentObj);
                }
                
                responseObj.add("components", jsonArr);
//                System.out.println(responseObj.toString());
                out.println(responseObj.toString());
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
