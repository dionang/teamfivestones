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
@WebServlet(name = "ComponentController", urlPatterns = {"/saveComponents"})
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
            StringBuilder jb = new StringBuilder();
            String line;
            BufferedReader reader = request.getReader();
            JsonObject json = new JsonParser().parse(reader).getAsJsonObject();
            
            String operation = json.get("operation").getAsString();
            int templateId = json.get("templateId").getAsInt();
            if(operation.equals("saveComponents")){
                JsonArray arr = json.getAsJsonArray("components");
                ArrayList<Component> components = new ArrayList<>();
                for(int i=0; i<arr.size();i++){
                    JsonObject componentObj = arr.get(i).getAsJsonObject();
                    String id = componentObj.get("id").getAsString();
                    String type = componentObj.get("type").getAsString();
                    int page = componentObj.get("page").getAsInt();
                    double x = componentObj.get("x").getAsDouble();
                    double y = componentObj.get("y").getAsDouble();
                    double height = componentObj.get("height").getAsDouble();
                    double width = componentObj.get("width").getAsDouble();
                    
                    if (type.equals("textbox")){
                        String text = componentObj.get("text").getAsString();
                        components.add(new Textbox(id, type, page, x, y, height, width, text));
                    } else {
                        components.add(new Component(id, type, page, x, y, height, width));
                    }
                }
                
                // remove existing data of the template, if exists
                ComponentDAO.deleteAllComponents(templateId);
                ComponentDAO.saveComponents(components, templateId);
            }
            
            out.println("saved successfully");

        }
        
//        String operation = request.getParameter("operation");
//        if(operation.equals("saveComponents")){
////            String name = request.getParameter("name");
////            String username = request.getParameter("username");
////            String password = request.getParameter("password");
////            String accountType = request.getParameter("accountType");
////            boolean status = AccountDAO.addAccount(username, password, account.getCompanyId(), accountType, name);
////            switch(accountType) {
////                case "developer" :  response.sendRedirect("createDevAccount.jsp" + (status ? "" : "?error=true"));
////                                    break;
////                case "manager"   :  response.sendRedirect("createManagerAccount.jsp" + (status ? "" : "?error=true"));
////                                    break;
////                case "user"      :  response.sendRedirect("createUserAccount.jsp" + (status ? "" : "?error=true"));
////                                    break;                    
////            }
////        } else if (operation.equals("setDatasource")){
////            String datasource = request.getParameter("datasource");
////            int companyId = Integer.parseInt(request.getParameter("companyId"));
////            boolean status = CompanyDAO.setDatasource(datasource, companyId);
////            response.sendRedirect("devHome.jsp" + (status ? "" : "?error=true"));
//            
//        }
//        ArrayList<Component> components = new ArrayList<>();
//        components.add(new Component("textbox1", "textbox",1,5.0,3.0,5.0,3.0));
//        components.add(new Component("textbox2", "textbox",1,4.0,3.0,5.4,3.0));
//        components.add(new Component("textbox3", "textbox",1,5.0,3.2,5.0,3.5));
//        ComponentDAO.saveComponents(components, 1);

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
