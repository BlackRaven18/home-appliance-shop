package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/persons")
public class PersonController {

    @Autowired
    private PersonService service;

    @GetMapping
    public List<Person> getPersons(){
        return service.findAllPersons();
    }

    @GetMapping("/{personId}")
    public Person getPersonById(@PathVariable String personId){
        return service.getPersonById(personId);
    }

    @PostMapping
    public ResponseEntity<?> createPerson(@RequestBody Person person) {
        if (service.existsByEmail(person.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        service.addPerson(person);
        return ResponseEntity.ok("User registered successfully");
    }

    @PutMapping
    public Person modifyPerson(@RequestBody Person person){
        return service.updatePerson(person);
    }

    @DeleteMapping("/{personId}")
    public String deletePerson(@PathVariable String personId){
        return service.deletePerson(personId);
    }




}
