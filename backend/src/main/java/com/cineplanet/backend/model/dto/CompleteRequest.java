package com.cineplanet.backend.model.dto;

public class CompleteRequest {
    private String email;
    private String names;
    private String dni;
    private String operationDate;
    private String transactionId;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public String names(){
        return names;
    }
    public void setNames(String names){
        this.names = names;
    }

    public String getDni(){
        return dni;
    }
    public void setDni(String dni){
        this.dni = dni;
    }

    public String getOperationDate(){
        return operationDate;
    }
    public void setOperationDate(String operationDate){
        this.operationDate = operationDate;
    }

    public String getTransactionId(){
        return transactionId;
    }
    public void setTransactionId(String transactionId){
        this.transactionId = transactionId;
    }
}
