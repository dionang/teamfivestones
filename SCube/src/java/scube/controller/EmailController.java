/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.*;
import scube.dao.AccountDAO;
import scube.dao.EmailDAO;
import scube.entities.Account;

/**
 *
 * @author ZhenDan
 */
@WebServlet(name = "EmailController", urlPatterns = {"/EmailController"})
public class EmailController extends HttpServlet {

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
         try(PrintWriter out = response.getWriter()){
        String path = request.getServletContext().getRealPath("/")+"uploadedFiles";
        //Create an file object (in the path app/build/web/temp) to store the zip file 
        File temp = new File(path);
        //Check if the file or directory exists? 
        if (!temp.exists()) {
            temp.mkdir(); //create the directory if temp folder does not exist
        }
        String username = "";
        String password = "";
        String message = "";
        String to = "";
        String subject = "";
        String ppt = "";
        String pdf = "";
        String home = System.getProperty("user.home");
        ArrayList<String> filePath = new ArrayList<String>();
        FileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        List items = null;
        try {
            items = upload.parseRequest(request);
        } catch (FileUploadException e) {
            e.printStackTrace();
        }
        Iterator itr = items.iterator();
        while (itr.hasNext()) {
            FileItem item = (FileItem) itr.next();
            if (item.isFormField()) {
                String fieldName = item.getFieldName();
                if (fieldName.equals("username")) {
                    username = item.getString();
                } else if (fieldName.equals("password")) {
                    password = item.getString(); 
                } else if (fieldName.equals("message")) {
                    message = item.getString();
                } else if (fieldName.equals("to")) {
                    to = item.getString();
                } else if (fieldName.equals("subject")) {
                    subject = item.getString();
                } else if (fieldName.equals("pdf")) {
                    pdf = item.getString();
                    if (pdf != null) {
                    filePath.add(home + "\\Downloads\\" + pdf);
                }
                } else if (fieldName.equals("ppt")) {
                    ppt = item.getString();
                    if (ppt != null) {
                    filePath.add(home + "\\Downloads\\" + ppt);
                }
                }


            } else {
                try {
                    String itemName = item.getName();
                    if(itemName!=""){
                        File savedFile = new File(path+"\\"+itemName);
                        item.write(savedFile);
                        filePath.add(path+"\\"+itemName);
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        boolean result=EmailDAO.sendEmail(username, password, to, subject, message, filePath);
        if(result){
            temp.delete();
        }
         out.println(result);
    }
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
