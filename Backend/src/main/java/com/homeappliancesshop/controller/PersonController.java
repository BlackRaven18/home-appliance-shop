package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class PersonController {

    @Autowired
    private PersonService service;

    @GetMapping("/persons")
    public List<Person> getPersons(){
        return service.findAllPersons();
    }

    @GetMapping("/persons/{personId}")
    public Person getPersonById(@PathVariable String personId){
        return service.getPersonById(personId);
    }

    @PutMapping("/persons/{personId}")
    public Person modifyPerson(@PathVariable String personId, @RequestBody Person person){
        System.out.println(person.toString());
        return service.updatePerson(personId, person);
    }

    @GetMapping("/persons/{personId}/transactions-history")
    public TransactionsHistory getPersonTransactionsHistory(@PathVariable String personId){
        return service.getPersonById(personId).getTransactionsHistory();
    }

    @PostMapping("/persons/login")
    public ResponseEntity<?> getPersonId(@RequestBody Person person) {
        String email = person.getEmail();
        String password = person.getPassword();

        Person retrievedPerson = service.getPersonByLoginDatas(email, password);

        if (retrievedPerson != null) {
            return ResponseEntity.ok(retrievedPerson.getPersonId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("\n" + "Invalid login details or user does not exist");
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> getAdminId(@RequestBody Person admin) {
        String email = admin.getEmail();
        String password = admin.getPassword();

        Person retrievedAdmin = service.getAdminByLoginDatas(email, password);

        if (retrievedAdmin != null) {
            return ResponseEntity.ok(retrievedAdmin.getPersonId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("\n" + "Invalid login details or admin does not exist");
        }
    }

    @PostMapping("/persons")
    public ResponseEntity<?> createPerson(@RequestBody Person person) {
        if (service.existsByEmail(person.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        service.addPerson(person);
        return ResponseEntity.ok(person.getPersonId());
    }

    @PutMapping("/persons")
    public Person modifyPerson(@RequestBody Person person){
        return service.updatePerson(person);
    }

    @DeleteMapping("/persons/{personId}")
    public String deletePerson(@PathVariable String personId){
        return service.deletePerson(personId);
    }
}
