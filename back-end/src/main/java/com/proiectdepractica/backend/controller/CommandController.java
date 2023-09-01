package com.proiectdepractica.backend.controller;

import com.proiectdepractica.backend.entity.Command;
import com.proiectdepractica.backend.payload.CommandDto;
import com.proiectdepractica.backend.service.CommandService;
import com.proiectdepractica.backend.utils.AppConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
public class CommandController {

    private CommandService commandService;

    public CommandController(CommandService commandService) {
        this.commandService = commandService;
    }

    @PostMapping("/api/commands")
    public ResponseEntity<CommandDto> addCommand(@RequestBody CommandDto commandDto) {
        return new ResponseEntity<>(commandService.createCommand(commandDto), HttpStatus.CREATED);
    }

    @GetMapping("/api/commands")
    public ResponseEntity<List<CommandDto>> getAllCommands(@RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo, @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize, @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy, @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir) {
        return new ResponseEntity<>(commandService.getAllCommands(pageNo, pageSize, sortBy, sortDir), HttpStatus.OK);
    }

    @GetMapping("/api/commands/{id}")
    public ResponseEntity<CommandDto> getCommandById(@PathVariable long id) {
        return new ResponseEntity<>(commandService.getCommandById(id), HttpStatus.OK);
    }

    @PutMapping("/api/commands/{id}")
    public ResponseEntity<CommandDto> updateCommand(@RequestBody CommandDto commandDto, @PathVariable long id) {
        return new ResponseEntity<>(commandService.updateCommand(commandDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/api/commands/{id}")
    public ResponseEntity<String> deleteCommandById(@PathVariable long id) {
        commandService.deleteCommandById(id);
        return new ResponseEntity<>("Car entity deleted successfully.", HttpStatus.OK);
    }

    @GetMapping("/api/test/commands")
    public ResponseEntity<List<Command>> returnAllCars() {
        return new ResponseEntity<>(commandService.returnAllCommands(), HttpStatus.OK);
    }

    @GetMapping("/api/test/completedCommands")
    public ResponseEntity<List<Command>> returnAllCompletedCommands() {
        return new ResponseEntity<>(commandService.returnAllCompletedCommands(), HttpStatus.OK);
    }

    @GetMapping("/api/test/onProcessCommands")
    public ResponseEntity<List<Command>> returnAllOnProcessCommands() {
        return new ResponseEntity<>(commandService.returnAllOnProcessCommands(), HttpStatus.OK);
    }
}
