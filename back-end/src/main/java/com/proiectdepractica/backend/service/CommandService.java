package com.proiectdepractica.backend.service;

import com.proiectdepractica.backend.entity.Command;
import com.proiectdepractica.backend.payload.CommandDto;

import java.util.List;

public interface CommandService {
    CommandDto createCommand(CommandDto commandDto);

    List<CommandDto> getAllCommands(int pageNo, int pageSize, String sortBy, String sortDir);

    CommandDto getCommandById(Long id);

    CommandDto updateCommand(CommandDto commandDto, Long id);

    void deleteCommandById(Long id);

    List<Command> returnAllCommands();

    List<Command> returnAllCompletedCommands();

    List<Command> returnAllOnProcessCommands();
}
