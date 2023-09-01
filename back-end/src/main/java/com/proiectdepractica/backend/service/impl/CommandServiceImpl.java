package com.proiectdepractica.backend.service.impl;

import com.proiectdepractica.backend.entity.Command;
import com.proiectdepractica.backend.exception.ResourceNotFoundException;
import com.proiectdepractica.backend.payload.CommandDto;
import com.proiectdepractica.backend.repository.CommandRepository;
import com.proiectdepractica.backend.service.CommandService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommandServiceImpl implements CommandService {

    private CommandRepository commandRepository;
    private ModelMapper mapper;

    public CommandServiceImpl(CommandRepository commandRepository, ModelMapper mapper) {
        this.commandRepository = commandRepository;
        this.mapper = mapper;
    }

    @Override
    public CommandDto createCommand(CommandDto commandDto) {
        Command command = mapper.map(commandDto, Command.class);
        Command savedCommand = commandRepository.save(command);
        CommandDto respondeCommand = mapper.map(savedCommand, CommandDto.class);
        return respondeCommand;
    }

    @Override
    public List<CommandDto> getAllCommands(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Command> posts = commandRepository.findAll(pageable);
        List<Command> commands = posts.getContent();
        List<CommandDto> respondeCommand = commands.stream().map(command -> mapper.map(command, CommandDto.class)).collect(Collectors.toList());

        return respondeCommand;
    }

    @Override
    public CommandDto getCommandById(Long id) {
        Command command = commandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Command", "id", id));
        CommandDto respondeCommand = mapper.map(command, CommandDto.class);
        return respondeCommand;
    }

    @Override
    public CommandDto updateCommand(CommandDto commandDto, Long id) {
        Command command = commandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Command", "id", id));
        command.setDate(commandDto.getDate());
        command.setCompleted(commandDto.isCompleted());

        Command savedCommand = commandRepository.save(command);
        CommandDto respondeCommand = mapper.map(savedCommand, CommandDto.class);
        return respondeCommand;
    }

    @Override
    public void deleteCommandById(Long id) {
        commandRepository.deleteById(id);
    }

    @Override
    public List<Command> returnAllCommands() {


        return commandRepository.findAll();
    }

    @Override
    public List<Command> returnAllCompletedCommands() {
        return commandRepository.findByCompletedTrue();
    }

    @Override
    public List<Command> returnAllOnProcessCommands() {
        return commandRepository.findByCompletedFalse();
    }
}
