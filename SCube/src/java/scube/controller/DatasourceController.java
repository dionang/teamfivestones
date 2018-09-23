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
import javax.servlet.http.HttpSession;
import scube.dao.DatasourceDAO;
import scube.entities.*;

/**
 *
 * @author HongYuan
 */
@WebServlet(name = "DatasourceController", urlPatterns = {"/addDatasource", "/getDatasources", "/updateDatasource", "/loadDatasource", "/loadDataset", "/loadListOptions"})
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

        try (PrintWriter out = response.getWriter()) {
            boolean ajax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
            boolean isJson ="application/json".equals(request.getHeader("Content-Type"));
            JsonObject json = new JsonObject();
            String operation = "";
            if (ajax ||isJson) {
                BufferedReader reader = request.getReader();
                json = new JsonParser().parse(reader).getAsJsonObject();
                operation = json.get("operation").getAsString();
            } else {
                operation = request.getParameter("operation");
            }

            if (operation.equals("addDatasource")) {
                String datasourceUrl = json.get("datasourceUrl").getAsString();
                String datasourceName = json.get("datasourceName").getAsString();
                String remark = json.get("remark").getAsString();
                boolean result = true;
                boolean status = DatasourceDAO.addDatasource(account.getCompanyId(), datasourceUrl, datasourceName, remark);
                if (status) {
                    JsonArray allArr = json.getAsJsonArray("params");
                    int id = DatasourceDAO.getLatestDatasourceId();
                    for (int i = 0; i < allArr.size(); i++) {
                        JsonArray div = allArr.get(i).getAsJsonArray();
                        String path = div.get(0).getAsString();
                        String name = div.get(1).getAsString();
                        String type = div.get(2).getAsString();
                        boolean r = DatasourceDAO.addDataset(name, path, type, id);
                        if (r && type.equals("list")) {
                            for (int j = 3; j < div.size(); j++) {
                                JsonArray fieldList = div.get(j).getAsJsonArray();
                                int datasetId = DatasourceDAO.getLatestDatasetId();
                                String fNValue = fieldList.get(0).getAsString();
                                String fName = fieldList.get(1).getAsString();
                                String dType = fieldList.get(2).getAsString();
                                String iType = fieldList.get(3).getAsString();

                                boolean r1 = DatasourceDAO.addListOption(fNValue,fName, dType, iType, datasetId);
                                if (!r1) {
                                    result = false;
                                }
                            }
                        } else if (!r) {
                            result = false;
                        }

                    }
                } else {
                    result = false;
                }
                out.print(result);
            } else if (operation.equals("getDatasources")) {
                String viewBtn = request.getParameter("viewBtn");
                int id;
                if (viewBtn != null) {
                    id = Integer.parseInt(request.getParameter("datasourceId"));
                    Datasource data = DatasourceDAO.retrieveDatasourceById(id);
                    ArrayList<Dataset> set = DatasourceDAO.getAllDatasetByDatasource(id);
                    ArrayList<ArrayList<List>> listoption = new ArrayList<>();
                    for (Dataset d : set) {
                        int setId = d.getDatasetId();
                        String type = d.getType();
                        if (type.equals("list")) {
                            ArrayList<List> list = DatasourceDAO.getAllListOptionByDataset(setId);
                            listoption.add(list);
                        } 
                    }
                    request.setAttribute("datasource", data);
                    request.setAttribute("dataset", set);
                    request.setAttribute("listoption", listoption);
                    request.getRequestDispatcher("loadDatasource.jsp").forward(request, response);
                }
                String deleteBtn = json.get("deleteBtn").getAsString();
                if (deleteBtn != null) {
                    id = json.get("id").getAsInt();
                    boolean result = true;
                    boolean dDatasource = DatasourceDAO.deleteDatasource(id);
                    if (!dDatasource) {
                        result = false;
                    }
                    ArrayList<Dataset> dataset = DatasourceDAO.getAllDatasetByDatasource(id);
                    if (!dataset.isEmpty()) {

                        for (Dataset d : dataset) {
                            int datasetId = d.getDatasetId();
                            boolean dDataset = DatasourceDAO.deleteDataset(datasetId);
                            boolean dListOption = DatasourceDAO.deleteListOption(datasetId);
                            if (!dDataset || !dListOption) {
                                result = false;
                            }
                        }
                    }
                    out.print(result);
                }

            } else if (operation.equals("updateDatasource")) {
                int id = json.get("id").getAsInt();
                String datasourceUrl = json.get("datasourceUrl").getAsString();
                String datasourceName = json.get("datasourceName").getAsString();
                String remark = json.get("remark").getAsString();
                String allDataset=json.get("allDataset").getAsString();
                String allList=json.get("allList").getAsString();
                String updateSet="";
                String updateList="";
                boolean result = true;
                boolean status = DatasourceDAO.updateDatasource(id, account.getCompanyId(), datasourceUrl, datasourceName, remark);
                if (status) {
                    JsonArray allArr = json.getAsJsonArray("params");
                    for (int i = 0; i < allArr.size(); i++) {
                        JsonArray div = allArr.get(i).getAsJsonArray();
                        String dId = div.get(0).getAsString();
                        String path = div.get(1).getAsString();
                        String name = div.get(2).getAsString();
                        String type = div.get(3).getAsString();
                        boolean r = true;
                        boolean r1 = true;
                        int datasetId=0;
                        if (dId.equals("new")) {
                           r = DatasourceDAO.addDataset(name, path, type, id);
                           datasetId=DatasourceDAO.getLatestDatasetId();
                        } else {
                            datasetId = div.get(0).getAsInt();
                            updateSet+=dId+",";
                            r = DatasourceDAO.updateDataset(datasetId, name, path, type, id);   
                        }
                        
                        if (r && type.equals("list")) {
                            for (int j = 4; j < div.size(); j++) {
                                JsonArray fieldList = div.get(j).getAsJsonArray();
                                String lId = fieldList.get(0).getAsString();
                                String fNValue = fieldList.get(1).getAsString();
                                String fName = fieldList.get(2).getAsString();
                                String dType = fieldList.get(3).getAsString();
                                String iType = fieldList.get(4).getAsString();
                                if (lId.equals("newList")) {
                                   r1 = DatasourceDAO.addListOption(fNValue,fName, dType, iType,datasetId);

                                } else {
                                    int listId = fieldList.get(0).getAsInt();
                                    r1 = DatasourceDAO.updateList(listId,fNValue, fName, dType, iType, datasetId);
                                    updateList+=lId;
                                }
                                if (!r1) {
                                       result = false;
                                   }

                            }
                        } else if (!r) {
                            result = false;
                        } 
                    }
                     
                    if(allDataset.length()!=0&&!updateSet.equals(allDataset)){
                        String[] update={};
                        String[] all={};
                        if(updateSet.length()!=0){
                              updateSet = updateSet.substring(0, updateSet.length() - 1);
                              update =  updateSet.split(",");
                        }
                          
                        allDataset = allDataset.substring(0, allDataset.length() - 1);
                           
                        all = allDataset.split(",");
                        for(int a=0;a<all.length;a++){
                            String n1=all[a];
                            boolean same=false;
                            for(int b=0;b<update.length;b++){
                                String n2=update[b];
                                if(n1.equals(n2)){
                                    same=true;
                                }
                            }
                            if(!same){
                                boolean dDataset = DatasourceDAO.deleteDataset(Integer.parseInt(n1));
                                boolean dListOption = DatasourceDAO.deleteListOption(Integer.parseInt(n1));
                                if (!dDataset || !dListOption) {
                                    result = false;
                                    System.out.println("something wrong with deleteDataset or listOption");
                                }
                            }
                        }
                    }
                    
                    if(allList.length()!=0 &&!updateList.equals(allList)){
                        String[] update={};
                        String[] all={};
                        if(updateList.length()!=0){
                            updateList = updateList.substring(0, updateList.length() - 1);
                            update =  updateList.split(",");
                        }
                            
                        allList= allList.substring(0,  allList.length() - 1);
                        all= allList.split(",");
                        for(int a=0;a<all.length;a++){
                            String n1=all[a];
                            boolean same=false;
                            for(int b=0;b<update.length;b++){
                                String n2=update[b];
                                if(n1.equals(n2)){
                                    same=true;
                                }
                            }
                            if(!same){
                                boolean dListOption = DatasourceDAO.deleteListOptionById(Integer.parseInt(n1));
                                if (!dListOption) {
                                    System.out.println("something wrong with deleteOPtionById");
                                    result = false;
                                }
                            }
                        }
                    }
                } else {
                    result = false;
                    System.out.println("something wrong with updateDatasource");
                }
                out.print(result);
            } else if (operation.equals("loadDatasource")){
                JsonObject responseObj = new JsonObject();
                int companyId = json.get("companyId").getAsInt();
                ArrayList<Datasource> datasource=DatasourceDAO.getAllDatasources(companyId);
                JsonArray datasourceArr = new JsonArray();
                for(Datasource source: datasource){
                    JsonObject sourceObj = new JsonObject();
                    sourceObj.addProperty("id", source.getDatasourceId());
                    sourceObj.addProperty("url", source.getDatasourceUrl());
                    sourceObj.addProperty("name", source.getDatasourceName());
                    datasourceArr.add(sourceObj);
                }
                responseObj.add("datasource", datasourceArr);
                out.println(responseObj.toString());
                
            } else if (operation.equals("loadDataset")){
                JsonObject responseObj = new JsonObject();
                int datasourceId = json.get("datasourceId").getAsInt();
                ArrayList<Dataset> dataset=DatasourceDAO.getListTypeDataset(datasourceId);
                JsonArray datasetArr = new JsonArray();
                for(Dataset set: dataset){
                    JsonObject setObj = new JsonObject();
                    setObj.addProperty("id", set.getDatasetId());
                    setObj.addProperty("path", set.getPath());
                    setObj.addProperty("name", set.getDtatasetName());
                    datasetArr.add(setObj);
                }
                responseObj.add("dataset", datasetArr);
                out.println(responseObj.toString());
                
            }else if (operation.equals("loadListOptions")){
                JsonObject responseObj = new JsonObject();
                int datasetId = json.get("datasetId").getAsInt();
                ArrayList<List> list=DatasourceDAO.getAllListOptionByDataset(datasetId);
                JsonArray listArr = new JsonArray();
                for(List option: list){
                    JsonObject listObj = new JsonObject();
                    listObj.addProperty("value", option.getFNValue());
                    listObj.addProperty("name", option.getfFieldName());                    
                    listObj.addProperty("type", option.getType());
                    listObj.addProperty("infoType", option.getInfoType());
                    listArr.add(listObj);
                }
                responseObj.add("list", listArr);
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
