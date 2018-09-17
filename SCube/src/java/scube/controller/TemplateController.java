/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import scube.dao.ComponentDAO;
import scube.dao.ReportDAO;

/**
 *
 * @author ZhenDan
 */
@WebServlet(name = "TemplateController", urlPatterns = {"/createTemplate", "/loadTemplate", "/updateTemplate", "/loadDefault", "/slideShow"})
public class TemplateController extends HttpServlet {

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
            String operation=request.getParameter("operation");
            int id;
            if(operation.equals("loadTemplate")){
                String viewBtn = request.getParameter("viewBtn");
                if(viewBtn != null){
                    id=Integer.parseInt(request.getParameter("templateId"));
                    request.setAttribute("templateId", id);
                    request.getRequestDispatcher("loadTemplate.jsp").forward(request, response);
                } 

                String deleteBtn = request.getParameter("deleteBtn");
                if(deleteBtn != null){
                    id=Integer.parseInt(request.getParameter("id"));
                    boolean deleteComponents = ComponentDAO.deleteAllComponents(id);
                    boolean deleteTemplate  = ReportDAO.deleteTemplate(id);
                    out.print(deleteComponents && deleteTemplate);
                }

            } else if(operation.equals("createTemplate") || operation.equals("updateTemplate")){
                String templateName   = request.getParameter("templateName");
                String templateSize   = request.getParameter("templatesize");
                String templateLayout = request.getParameter("templatelayout");
                String userName = request.getParameter("userName");
                int companyId = Integer.parseInt(request.getParameter("companyId"));                
                int templateId = Integer.parseInt(request.getParameter("templateId"));


                if (operation.equals("createTemplate")){
                    if(ReportDAO.createTemplate(companyId, templateName, userName, templateSize, templateLayout)){
                        out.print(ReportDAO.retrieveTemplateId());
                    } else {
                        out.print("false");
                    }
                } else {
                    boolean result = ReportDAO.updateTemplate(templateId, templateName, templateSize, templateLayout);
                    out.print(result+"");
                }
 
            } else if(operation.equals("loadDefault")){
                id=Integer.parseInt(request.getParameter("templateId"));
                request.setAttribute("templateId", id);
                request.getRequestDispatcher("loadTemplate.jsp").forward(request, response);
            } else if(operation.equals("slideShow")){
                ArrayList<String> result = new ArrayList<>();
                String template=request.getParameter("template");
               
                if(template!=null){
                    String tempId = template.substring( 0, template.indexOf(","));
                    String tempName = template.substring(template.indexOf(",")+1, template.length());
                    int templateId=Integer.parseInt(tempId);
                    int pages = ComponentDAO.getPageNoByTemplateId(templateId) + 1;
                    if(pages != 0){
                        for(int i=1;i<=pages;i++){
                            result.add("https://scube.rocks/images/"+tempName+"_slide"+i+".jpg");   
                        }
                    }
                }
                request.setAttribute("slides", result);
                request.getRequestDispatcher("slideShow2.jsp").forward(request, response);
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
