package scube.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import scube.dao.DatasourceDAO;
import scube.entities.*;

/**
 *
 * @author HongYuan
 */
@WebServlet(name = "DatasourceController", urlPatterns = {"/addDatasource", "/getDatasources", "/updateDatasource"})
public class DatasourceController extends HttpServlet {

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
        HttpSession session = request.getSession();
        Account account = (Account) session.getAttribute("account");
                    
        String operation = request.getParameter("operation");
       
        try(PrintWriter out = response.getWriter()){
            if(operation.equals("addDatasource")) {
                 
                String datasourceUrl = request.getParameter("datasourceUrl");
                String datasourceName = request.getParameter("datasourceName");
                String remark = request.getParameter("remark");
                String path[]=request.getParameterValues("path");
              
                String name[]=request.getParameterValues("name");
               
                String type[]=request.getParameterValues("type");
                 String fieldName[]=request.getParameterValues("fieldName");
               System.out.println(Arrays.toString(fieldName));
                String dataType[]=request.getParameterValues("dataType");
                String infoType[]=request.getParameterValues("infoType");
                
                boolean status = DatasourceDAO.addDatasource(account.getCompanyId(),datasourceUrl,datasourceName,remark);
                ArrayList<Boolean> result=null;
                if(status){
                   int id=DatasourceDAO.getLatestDatasoureId();
                    for(int i=1;i<path.length;i++){
                        String p=path[i];
                        String n=name[i];
                        String t=type[i];
                        result.add(DatasourceDAO.addDataset(n,p,t,id));
                } 
                }
                out.print(status);                 
            } else if (operation.equals("getDatasources")){
                String viewBtn=request.getParameter("viewBtn");
                int id;
                if(viewBtn!=null){
                    id=Integer.parseInt(request.getParameter("datasourceId"));
                    Datasource data = DatasourceDAO.retrieveDatasourceById(id);
                    request.setAttribute("datasource", data);
                    request.getRequestDispatcher("loadDatasource.jsp").forward(request, response);
                } 
                String deleteBtn = request.getParameter("deleteBtn");
                if(deleteBtn!=null){
                    id=Integer.parseInt(request.getParameter("id"));
                    boolean result = DatasourceDAO.deleteDatasource(id);
                    out.print(result);
                   
                }
   
            }else if(operation.equals("updateDatasource")){
                
                int id=Integer.parseInt(request.getParameter("id"));
                String datasourceUrl = request.getParameter("datasourceUrl");
                String datasourceName = request.getParameter("datasourceName");
                String remark = request.getParameter("remark");
                boolean status = DatasourceDAO.updateDatasource(id,account.getCompanyId(),datasourceUrl,datasourceName,remark);
                out.print(status);                 
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
