package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Admin;
import com.homeappliancesshop.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService service;

    @GetMapping
    public List<Admin> getAdmins(){
        return service.findAllAdmins();
    }

    @GetMapping("/{adminId}")
    public Admin getAdminById(@PathVariable String adminId){
        return service.getAdminById(adminId);
    }

    @PostMapping("/login")
    public ResponseEntity<?> getAdminId(@RequestBody Admin admin) {
        String email = admin.getEmail();
        String password = admin.getPassword();

        Admin retrievedAdmin = service.getAdminByLoginDatas(email, password);

        if (retrievedAdmin != null) {
            return ResponseEntity.ok(retrievedAdmin.getAdminId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("\n" + "Invalid login details or admin does not exist");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        if (service.existsByEmail(admin.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        service.addAdmin(admin);
        return ResponseEntity.ok(admin.getAdminId());
    }

    @PutMapping
    public Admin modifyAdmin(@RequestBody Admin admin){
        return service.updateAdmin(admin);
    }

    @DeleteMapping("/{adminId}")
    public String deleteAdmin(@PathVariable String adminId){
        return service.deleteAdmin(adminId);
    }
}
