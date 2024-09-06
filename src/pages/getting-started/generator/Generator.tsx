
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom'
import Master from '@/pages/master/Master';

function Generator() {    
    const navigate = useNavigate()

  return (
    <>        
    <Master children = {
        <>
            <Box>
                <Typography variant="h4">BasePoint Generator - Overview</Typography>
                <Typography paragraph align='left'>A Visual Studio extension that generates the code from clean architecture approach based on an entity class and its properties.</Typography>

                <Typography variant="h4">Introduction</Typography>
                <Typography paragraph align='left'>This extension generates code for the solution and classes based on BasePoint framework for all Domain-Driven Design (DDD) layers and Clean Architecture layers. Using the Clean Architecture approach can be time-consuming as it involves many files, including classes, interfaces, and SQL scripts.

                This extension simplifies the process by creating all the necessary files within the solution, saving you valuable time.

                Types of files that this extension can do for you:</Typography>

                <Typography variant="h4">What is possible to create with the extension?</Typography>

                <Typography variant="h6">From Domain Layer:</Typography>        
                <Typography paragraph align='left'>Interface for the repository</Typography>
                <Typography paragraph align='left'>Implementation class for the repository</Typography>
                <Typography paragraph align='left'>Interface for the command provider</Typography>
                

                <Typography variant="h6">From Application Layer:</Typography>
                <Typography paragraph align='left'>Dto record for create use case input</Typography>
                <Typography paragraph align='left'>Dto record for update use case input</Typography>
                <Typography paragraph align='left'>Dto record for use case output</Typography>
                <Typography paragraph align='left'>Dto record for get by filter paginated use case output</Typography>
                <Typography paragraph align='left'>Validation class for the dto create use case input</Typography>
                <Typography paragraph align='left'>Validation class for the dto update use case input</Typography>
                <Typography paragraph align='left'>Create Use Case class for the entity</Typography>
                <Typography paragraph align='left'>Preventing register duplication if you need</Typography>
                <Typography paragraph align='left'>Update Use Case class for the entity</Typography>
                <Typography paragraph align='left'>Preventing register duplication if you need</Typography>
                <Typography paragraph align='left'>Validate if the entity exists on the repository</Typography>
                <Typography paragraph align='left'>Delete Use Case class for the entity</Typography>
                <Typography paragraph align='left'>Validate if the entity exists on the repository</Typography>
                <Typography paragraph align='left'>GetById Use case class</Typography>
                <Typography paragraph align='left'>Validate if the entity exists on the repository</Typography>
                <Typography paragraph align='left'>GetPaginated use case</Typography>
                <Typography paragraph align='left'>Interface for query provider (used in GetById UseCase)</Typography>
                <Typography paragraph align='left'>Interface for list item query provider (used in GetPaginated Use Case)</Typography>
                <Typography paragraph align='left'>Error messages constants creation</Typography>
                <Typography paragraph align='left'>Set Dependencies mappings for use cases</Typography>
                <Typography paragraph align='left'>Set Dependencies mappings for validators</Typography>

                <Typography variant="h6">From Infrastructure Layer:</Typography>
                <Typography paragraph align='left'>Dapper command class for the entity</Typography>
                <Typography paragraph align='left'>Dapper command provider class for the entity</Typography>
                <Typography paragraph align='left'>Dapper query provider class that implements command provider</Typography>
                <Typography paragraph align='left'>Dapper query provider class that implements list item query provider</Typography>
                <Typography paragraph align='left'>Dapper Table definition class for the entity</Typography>
                <Typography paragraph align='left'>Set Dependencies mappings for command providers</Typography>
                <Typography paragraph align='left'>Set Dependencies mappings for query providers</Typography>
                <Typography paragraph align='left'>Migration SQL Script to create the table that represents the entity</Typography>

                <Typography variant="h6">From Unit Tests project:</Typography>
                <Typography paragraph align='left'>Builder class for the create use case input dto</Typography>
                <Typography paragraph align='left'>Builder class for the update use case input dto</Typography>
                <Typography paragraph align='left'>Builder class for the use case output dto</Typography>
                <Typography paragraph align='left'>Builder class for the list use case output dto</Typography>
                <Typography paragraph align='left'>Builder class for the entity</Typography>
                <Typography paragraph align='left'>Unit tests class for the entity</Typography>
                <Typography paragraph align='left'>Test for each method</Typography>
                <Typography paragraph align='left'>Unit tests class for create use case input dto validation</Typography>
                <Typography paragraph align='left'>Unit tests class for update use case input dto validation</Typography>
                <Typography paragraph align='left'>Unit tests class for create use case</Typography>
                <Typography paragraph align='left'>Unit tests class for update use case</Typography>
                <Typography paragraph align='left'>Unit tests class for delete use case</Typography>
                <Typography paragraph align='left'>Unit tests class for get by id use case</Typography>


                <Typography variant="h6">From Presentation Layer:</Typography>
                <Typography paragraph align='left'>Controller for entity operations:</Typography>
                <Typography paragraph align='left'>Post endpoint</Typography>
                <Typography paragraph align='left'>Put endpoint</Typography>
                <Typography paragraph align='left'>Delete endpoint</Typography>
                <Typography paragraph align='left'>GetById endpoint</Typography>
                <Typography paragraph align='left'>GetPaginated by filter endpoint</Typography>

                <Typography variant="h6">Additionals:</Typography>
                <Typography paragraph align='left'>Postman collection for the created endpoints that refer to:</Typography>
                <Typography paragraph align='left'>Create Use Case</Typography>
                <Typography paragraph align='left'>Update Use Case</Typography>
                <Typography paragraph align='left'>Delete Use Case</Typography>
                <Typography paragraph align='left'>GetById Use case</Typography>
                <Typography paragraph align='left'>GetPaginated use case</Typography>

                <Button variant="contained" endIcon={<KeyboardArrowRightIcon />} onClick={ () => {navigate('/getting-started/installation')}}>
                    Install extension
                </Button>
            </Box>
        </>}>
    </Master>
    </>
  )
}
    
export default Generator