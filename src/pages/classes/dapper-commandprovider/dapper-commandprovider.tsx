import { Box, Typography } from '@mui/material';
import  Master from '@pages/master/Master'
import { Element } from 'react-scroll'
import { csharp } from "@replit/codemirror-lang-csharp"
import CodeMirror from '@uiw/react-codemirror'
import { codeEditorTheme } from '@shared/configs/constants/themes'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useState, useLayoutEffect } from 'react'

import Button from '@mui/material/Button'
import GitHubIcon from '@mui/icons-material/GitHub'
import YouTubeIcon from '@mui/icons-material/YouTube'

import dddLifeCycle from '@assets/images/DDDLifeCycle.png'

const marks = [
  {
    value: 60,
    label: 'BaseEntity',
  },
  {
    value: 50,
    label: 'Entity lifecycle',   
  },
  {
    value: 40,
    label: 'Stage management',
  },
  {
    value: 30,
    label: 'Sample entity using in a use case',
  },
  {
    value: 20,
    label: 'Properties',
  },
  {
    value: 10,
    label: 'Methods',
  },
];

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '12px', transform: 'scale(1.8)' }}
  >
    •
  </Box>
);

function createData(
  type: string,
  name: string,
  description: string  
) {
  return { type, name, description };
}

const properties = [
  createData('Guid', 'Id', 'Retorna se uma instância é igual a outra, baseada no identificador'),
  createData('EntityState', ' State', 'Estado da entidade'),
  createData('DateTime', 'CreationDate', 'Data de criação da entidade'),
  createData('Dictionary<string, object>', 'PersistedValues', 'Dicionário com nome e valor das propriedades recuperadas do reposítory'),
  createData('IList<IEntityObserver>', 'Observers', 'Lista de observadores do State da entidade'),
];

const methods = [
  createData('bool', 'Equals', 'Retorna se uma instância é igual a outra, baseada no identificador'),
  createData('int', ' GetHashCode', 'Retorna o hash code do idenfificador'),
  createData('bool', 'PropertyIsUpdated', 'Retorna se uma propriedade foi atualizada com relação ao valor reconstituído do repositório'),
  createData('Dictionary<string, object>', 'GetPropertiesToPersist', 'Retorna dicionários com as propriedades inseridas/alteradas a serem persistidas'),
  createData('void', 'SetStateAsUpdated', 'Define o State como updated, caso está for Unchanged ou Persisted'),
  createData('void', 'SetStateAsDeleted', 'Define o State como Deleted, caso este for difernete de New'),
  createData('void', 'SetStateAsPersisted', 'Define o status como Persisted, caso este for New ou Updated e como PersistedDeleted caso este for Deleted'),
  createData('void', 'SetStateAsUnchanged', 'Define o State como Unchanged e inicializa o dicionário de valores persistidos'),
  createData('IBaseEntity', 'EntityClone', 'Cria um novo objeto com identificador novo e dados idênticos ao original'),
  createData('void', ' Copy', 'Copia para a instância atual todos os dados de uma outra instância, exceto o identificador'),
  createData('object', 'Clone', 'Cria um novo objeto com identificador novo e dados idênticos ao original, faz uma chamada ao método EntityClone'),
  createData('void', 'AddObserver', 'Adiciona um obsrvador do estado da entidade'),
  createData('void','RemoveObserver', 'Remove um observador do estado da entidade'),
  createData('void','NotifyEntityObserversPropertyUpdate', 'Notifica a todosos observadores que o estado de um propriedade foi alterado'),
];

const DapperCommandProvider = () => {
  const [sampleEntityContent, setSampleEntityContent] = useState('');
  const [sampleCommandUseCaseContent, setSampleCommandUseCaseContent] = useState('');

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  useLayoutEffect(() => {     
    fetchSampleContents();
  }, []);

  const fetchSampleContents = async () => {
    try {
      const entityContentResponse = await fetch('https://raw.githubusercontent.com/eliassilvadev/best-practices/main/Best.Practices.Core.Tests/Domain/Entities/SampleEntity.cs');
      if (entityContentResponse.ok) {
        const fileContent = await entityContentResponse.text();
        setSampleEntityContent(fileContent);
      }  
      
      const sampleUseCaseContentResponse = await fetch('https://raw.githubusercontent.com/eliassilvadev/best-practices/main/Best.Practices.Core.Tests/Application/UseCases/SampleUseCases/SampleCommandUseCase.cs');
      if (sampleUseCaseContentResponse.ok) {
        const fileContent = await sampleUseCaseContentResponse.text();
        setSampleCommandUseCaseContent(fileContent);
      } 
    } catch (err) {
     
    } finally {
     
    }
  };

  return (
    <>
      <Master children = {
        <>
        <Box>
          <Element  name="BaseEntity">
            <Typography variant="h4">DapperCommandprovider</Typography>
         
            <Typography paragraph align="left">
              A classe abstrata <Box style={{ fontWeight: 'bold', display: 'inline' }}>BaseEntity</Box> facilita a implementação de classes que representam entidades no DDD.
            </Typography>          
            <Box>
              <CodeMirror
                value={sampleEntityContent}
                onChange={(newValue) => setSampleEntityContent(newValue)}
                theme={codeEditorTheme}
                extensions={[csharp()]}
                style={{ height: '100%',overflow: 'auto', zIndex: -1 }}
                
                readOnly
              />
            </Box>
            <Typography paragraph align="left">
              No DDD, uma entidade é um objeto com identidade única, distinguindo-o de outros objetos, mesmo que tenha atributos semelhantes. Entidades possuem um ciclo de vida que inclui criação, armazenamento, reconstituição e, em alguns casos, exclusão.
            </Typography>
          </Element>
          <Element name="Entity lifecycle">
            <Typography variant="h4">Entity lifecycle</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0 20px 0' }}>
              <Box component="img" alt="DDD lifecycle." src={dddLifeCycle} />
            </Box>
          </Element >
          <Element name="Stage management">
            <Typography variant="h4">Stage management</Typography>
          
            <Typography paragraph align="left">
              Para gerenciar os estados das entidades, a BaseEntity possui um identificador e um atributo <Box style={{ fontWeight: 'bold', display: 'inline' }}>State</Box>, que pode assumir os valores: <Box style={{ fontWeight: 'bold', display: 'inline' }}>New</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>Persisted</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>Unchanged</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>Updated</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>Deleted</Box> e <Box style={{ fontWeight: 'bold', display: 'inline' }}>PersistedDeleted</Box>.
            </Typography>
            <Typography paragraph sx={{ textIndent: '1em' }} align="left">
              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Criação de Entidade:</Box> Ao criar uma nova entidade, seu State é definido como <Box style={{ fontWeight: 'bold', display: 'inline' }}>New</Box>. Quando submetida ao <Box style={{ fontWeight: 'bold', display: 'inline' }}>Repository</Box>, ela será inserida no sistema.
            </Typography>
            <Typography paragraph sx={{ textIndent: '1em' }} align="left">
              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Reconstituição de Entidade:</Box> Entidades reconstituídas a partir do repositório têm seu State definido como <Box style={{ fontWeight: 'bold', display: 'inline' }}>Unchanged</Box>. O repositório cria interceptors para monitorar esse estado.
            </Typography>
            <Typography paragraph sx={{ textIndent: '1em' }} align="left">
              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Atualização de Entidade:</Box> Após a reconstituição do Repository, se uma propriedade da entidade em memória for alterada, e o novo valor for diferente do anterior, o State muda automaticamente para <Box style={{ fontWeight: 'bold', display: 'inline' }}>Updated</Box>. Ao submeter a entidade ao Repository, ela será atualizada no sistema.
            </Typography>
            <Typography paragraph sx={{ textIndent: '1em' }} align="left">
              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Exclusão de Entidade:</Box> Para excluir uma entidade com State igual a <Box style={{ fontWeight: 'bold', display: 'inline' }}>Unchanged</Box>, chame o método SetStateAsDeleted(). O State mudará para <Box style={{ fontWeight: 'bold', display: 'inline' }}>Deleted</Box> e, ao submeter ao Repository, a entidade será removida do sistema.
            </Typography>
            <Typography paragraph align="left">
              Os states <Box style={{ fontWeight: 'bold', display: 'inline' }}>Persisted</Box> e <Box style={{ fontWeight: 'bold', display: 'inline' }}>PersistedDeleted</Box> são definidos na entidade logo após submetê-la ao Repository quando a mesma está com os States <Box style={{ fontWeight: 'bold', display: 'inline' }}>New</Box>/<Box style={{ fontWeight: 'bold', display: 'inline' }}>Update</Box> e <Box style={{ fontWeight: 'bold', display: 'inline' }}>Deleted</Box> respectivamente.
            </Typography>
            <Typography paragraph align="left">
              Para todas as operações de inclusão, alteração e exclusão, chame o método Persist do Repository, que criará um <Box style={{ fontWeight: 'bold', display: 'inline' }}>IEntityCommand</Box> conforme a operação necessária.
            </Typography>
          </Element>
          <Box
            sx={{
              backgroundColor: '#e9fbf0',
              border: '1px solid #c6f6d9',
              borderRadius: '8px',
              color: '#5b9472',
              padding: '16px',
              margin: '10px 0',
              height: 'auto',
            }}
          >
            <Typography
              paragraph
              align="left"
              sx={{
                fontWeight: '600',
              }}
            >
              Para implementar a alteração automática de estado, as propriedades devem ser criadas com o modificador virtual.
            </Typography>
          </Box>
          <Element name="Sample entity using in a use case">
            <Typography variant="h4">Sample entity using in a use case</Typography>
          
            <Box>
              <CodeMirror
                value={sampleCommandUseCaseContent}
                onChange={(newValue) => setSampleCommandUseCaseContent(newValue)}
                theme={codeEditorTheme}
                extensions={[csharp()]}
                width={'100%'}
                minHeight={'200px'}
                readOnly
              />
            </Box>
          </Element>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 0px',
              width: '350px',
            }}
          >
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={() => {
                openInNewTab('https://github.com/eliassilvadev/best-practices/blob/main/Best.Practices.Core/Domain/Entities/BaseEntity.cs');
              }}
              sx={{
                fontSize: 16,
                fontWeight: 'bold',
                backgroundColor: '#373a43',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#292e3a',
                },
              }}
            >
              Source Code
            </Button>
            <Button
              variant="contained"
              startIcon={<YouTubeIcon />}
              onClick={() => {
                openInNewTab('https://github.com/eliassilvadev/best-practices/blob/main/Best.Practices.Core/Domain/Entities/BaseEntity.cs');
              }}
              sx={{
                fontSize: 16,
                fontWeight: 'bold',
                backgroundColor: '#ff0000',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#cc0c00',
                },
              }}
            >
              Sample video
            </Button>
          </Box>
          <Element name="Properties">
            <Typography variant="h4">Propriedades</Typography>
        
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }} width={320}>
                      name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} width={250}>
                      Type
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {properties.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left" component="th" scope="row" sx={{ color: '#4995e1', fontWeight: 'bold' }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        <Box sx={{ borderRadius: '5px', border: '1px solid #d2e9ff', backgroundColor: '#ebf5ff', width: 'fit-content', padding: '1px 4px' }}>
                          {row.type}
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Element>          
          <Element name="Methods">
            <Typography variant="h4">Métodos</Typography>
             
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }} width={320}>
                      name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} width={250}>
                      Type
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {methods.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left" component="th" scope="row" sx={{ color: '#4995e1', fontWeight: 'bold' }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        <Box sx={{ borderRadius: '5px', border: '1px solid #d2e9ff', backgroundColor: '#ebf5ff', width: 'fit-content', padding: '1px 4px' }}>
                          {row.type}
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Element>         
        </Box>      
        </>
      } marks={marks} >      
        </Master>
    </>
  );
};

export default DapperCommandProvider;