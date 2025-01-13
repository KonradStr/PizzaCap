package com.example.pizzacap.controller;


import com.example.pizzacap.model.Customer;
import com.example.pizzacap.model.CustomerDetail;
import com.example.pizzacap.model.TokenAuth;
import com.example.pizzacap.repository.CustomerRepo;
import com.example.pizzacap.service.AdminService;
import com.example.pizzacap.service.CustomerService;
import com.example.pizzacap.service.TokenService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Controller
public class CustomerController {
    @Autowired
    CustomerService service;
    @Autowired
    TokenService tokenService;
    @Autowired
    CustomerRepo customerRepo;

    @PostMapping("/getUserData")
    public ResponseEntity<CustomerDetail> getCustomerDetail(@RequestBody TokenAuth tokenAuth){
        System.out.println(tokenAuth);
        if(tokenService.checkUserToken(tokenAuth)){
            Customer validCustomer = customerRepo.findById(Integer.parseInt(tokenAuth.getUsername())).orElse(null);
            if(validCustomer != null){
                CustomerDetail customerDetail = new CustomerDetail();
                customerDetail.setName(validCustomer.getFirst_name());
                customerDetail.setEmail(validCustomer.getEmail());
                customerDetail.setPhone(validCustomer.getPhone_number());
                return ResponseEntity.ok(customerDetail);
            }else{
                return ResponseEntity.status(401).body(new CustomerDetail());
            }
        } else {
            return ResponseEntity.status(401).body(new CustomerDetail());
        }
    }
}
