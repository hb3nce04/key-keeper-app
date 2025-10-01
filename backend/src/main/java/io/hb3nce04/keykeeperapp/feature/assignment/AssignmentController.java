package io.hb3nce04.keykeeperapp.feature.assignment;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.hb3nce04.keykeeperapp.common.controller.AbstractCrudController;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request.AssignmentRequestDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.response.AssignmentResponseDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request.CreateAssignmentRequestDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request.PatchAssignmentRequestDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.entity.Assignment;
import io.hb3nce04.keykeeperapp.feature.key.model.enums.KeyStatus;

@RestController
@RequestMapping("/assignments")
public class AssignmentController
        extends AbstractCrudController<AssignmentService, Assignment, AssignmentRequestDto, AssignmentResponseDto, AssignmentRepository, AssignmentMapper>
{
    public AssignmentController(
            AssignmentService service) {
        super(service, true, false, true, false);
    }

    @PatchMapping("/return")
    public ResponseEntity<KeyStatus> returnBack(
            @RequestBody @Validated PatchAssignmentRequestDto dto) {
        return ResponseEntity.ok(service.returnBack(dto));
    }

    @PostMapping("/register")
    public ResponseEntity<AssignmentResponseDto> register(@RequestBody @Validated CreateAssignmentRequestDto dto) {
        AssignmentResponseDto createdDto = service.register(dto);
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(1).toUri()).body(createdDto);
    }
}
