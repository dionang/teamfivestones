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
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import scube.dao.ComponentDAO;
import scube.entities.Component;
import scube.entities.Textbox;

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
             System.out.println("i am herererer");
            String operation = json.get("operation").getAsString();
            int templateId = json.get("templateId").getAsInt();
            if(operation.equals("saveComponents")){
                System.out.println("i am saving component");
                JsonArray arr = json.getAsJsonArray("components");
                ArrayList<Component> components = new ArrayList<>();
                for(int i=0; i<arr.size();i++){
                    JsonObject componentObj = arr.get(i).getAsJsonObject();
                    String type = componentObj.get("type").getAsString();
                    int x = componentObj.get("x").getAsInt();
                    int y = componentObj.get("y").getAsInt();
                    int height = componentObj.get("height").getAsInt();
                    int width = componentObj.get("width").getAsInt();
                    
                    if (type.equals("text")){
                        JsonObject properties = componentObj.get("properties").getAsJsonObject();
                        String text = properties.get("text").getAsString();
                        components.add(new Textbox(type, x, y, height, width, text));
                    } else {
                        components.add(new Component(type, x, y, height, width));
                    }
                }
                
                // remove existing data of the template, if exists
                ComponentDAO.deleteAllComponents(templateId);
                boolean status = ComponentDAO.saveComponents(components, templateId);
                responseObj.addProperty("status", status);
                out.println(responseObj.toString());
                
            } else if (operation.equals("loadComponents")) {
                ArrayList<Component> components = ComponentDAO.loadComponentsFromTemplate(templateId);
                JsonArray jsonArr = new JsonArray();
                for(Component component : components){
                    JsonObject componentObj = new JsonObject();
                    componentObj.addProperty("type", component.getType());
                    componentObj.addProperty("x", component.getX());
                    componentObj.addProperty("y", component.getY());
                    componentObj.addProperty("height", component.getHeight());
                    componentObj.addProperty("width", component.getWidth());
                    
                    // if textbox
                    if(component.getType().equals("text")){
                        Textbox textbox = (Textbox) component;
                        JsonObject properties = new JsonObject();
                        properties.addProperty("text", textbox.getText());
                        componentObj.add("properties", properties);
                    }
                    
                    // add component to jsonArr
                    jsonArr.add(componentObj);
                }
                
                responseObj.add("components", jsonArr);
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
