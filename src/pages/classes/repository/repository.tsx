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

import repositorySequanceDiagram from '@assets/images/RepositorySequanceDiagram.png'
import { routePaths } from '@shared/configs/constants/routes-path'
import ClassLink from '@/components/shared/class-link/class-link';
import ClassTitle from '@/components/shared/class-title/class-title';
import Alert from '@mui/material/Alert';
import { EditorView } from '@codemirror/view';

const marks = [
  {
    value: 50,
    label: 'Repository',
  },
  {
    value: 40,
    label: 'Lógica do Repository',   
  },
  {
    value: 30,
    label: 'Exemplo de uso',
  },
  {
    value: 20,
    label: 'Métodos',
  },
  {
    value: 10,
    label: 'Explore',
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

const methods = [
  createData('void', 'Persist', 'Cria um IEntityCommand correspondente a operação de persistência (inclusão, alteração ou exclusão)'),
  createData('Task<Entity>', ' GetById', 'Método genérico que retorna a entidade parametrizada pelo identificador da mesma'),
  createData('T', 'HandleAfterGetFromCommandProvider', 'Cria interceptors que gerenciam automaticamente o estado da entidade quando alguma propriedade é alterada')  
];

const Repository = () => {
  const [sampleRepositoryContent, setSampleRepositoryContent] = useState('');
  const [sampleServiceClassContent, setSampleServiceClassContent] = useState('');
  const [entityStateContent, setEntityStateContent] = useState('');
  const [interfaceCqrsCommandProviderPreviewContent, setinterfaceCqrsCommandProviderPreviewContent] = useState('');
  const [interceptoPreviewContent, setInterceptoPreviewContent] = useState('');

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  useLayoutEffect(() => {
    fetchSampleContents();
  }, []);

  const fetchSampleContents = async () => {
    try {

      setInterceptoPreviewContent(`public class EntityStateControlInterceptorLinfu : IEntityStateObserver, IEntityObserver, IInvokeWrapper
        {
          public void AfterInvoke(InvocationInfo info, object returnValue)
          { ... }
        
          public void BeforeInvoke(InvocationInfo info)
          { ... }
        
          public object DoInvoke(InvocationInfo info)
          { ... }
          
          public EntityStateControlInterceptorLinfu(
            IBaseEntity entity,
            EntityStateControlInterceptorLinfu parentInterceptor) : this(entity)
          { ... }
          
          public T CreateEntityWihStateControl<T>(T entity)
            where T : IBaseEntity
          { ... }
        
          public void NotifyEntityPropertyUpdate(
          IBaseEntity entity, string propertyName, object propertyValue)
          { ... }
        }`)

      setSampleRepositoryContent(`public class SampleRepository : Repository<SampleEntity>, ISampleRepository
{
    private readonly ISampleCqrsCommandProvider _commandProvider;

    public SampleRepository(ISampleCqrsCommandProvider commandProvider) : base(commandProvider)
    {
        _commandProvider = commandProvider;
    }

    public async Task<SampleEntity> GetByCode(string code)
    {
        return HandleAfterGetFromCommandProvider(await _commandProvider.GetByCode(code));
    }

    public async Task<SampleEntity> GetByName(string name)
    {
        return HandleAfterGetFromCommandProvider(await _commandProvider.GetByName(name));
    }
}`)

      setSampleServiceClassContent(`public class ServiceClass : IServiceClass
{
    private readonly IAccessProfileRepository _accessProfileRepository;   
	private readonly IUnitOfWork _unitOfWork;

    public ServiceClass(     
      IAccessProfileRepository accessProfileRepository, IUnitOfWork unitOfWork)
    {
      _accessProfileRepository = accessProfileRepository;
	  _unitOfWork = unitOfWork; 
    }

	public override async Task ExecuteAsync(string name)
	{
		var accessProfile = await _accessProfileRepository.GetByName(name);

		accessProfile.Name = "AnotherName";

		_accessProfileRepository.Persist(accessProfile, _unitOfWork); // create commands for access profile and its items
		
		if (!await _unitOfWork.SaveChangesAsync())
		{
			await _unitOfWork.RollbackAsync();

			throw new ExecutionErrorException("Error while trying do save access profile");
		}		
	}
}`)

      setEntityStateContent(`namespace Best.Practices.Core.Domain.Enumerators
{
    public enum EntityState
    {
        New,
        Persisted,
        Unchanged,
        Updated,
        Deleted,
        PersistedDeleted
    }
}`);

setinterfaceCqrsCommandProviderPreviewContent(`public interface IApplicationCqrsCommandProvider : ICqrsCommandProvider<SampleEntity>
{
	Task<SampleEntity> GetByName(string name);
}

// In another assembly
public class ApplicationCqrsCommandProvider : DapperCqrsCommandProvider<Application>, IApplicationCqrsCommandProvider
{
	public override IEntityCommand GetAddCommand(Application entity)
	{
		return new ApplicationCommand((MySqlConnection)_connection, entity);
	}

	public override IEntityCommand GetDeleteCommand(Application entity)
	{
		return new ApplicationCommand((MySqlConnection)_connection, entity);
	}

	public override IEntityCommand GetUpdateCommand(Application entity)
	{
		return new ApplicationCommand((MySqlConnection)_connection, entity);
	}
	
	public override async Task<Application> GetById(Guid id)
	{...}

	public async Task<Application> GetByName(string name)
	{...}
}`)

    } catch (err) {
     
    } finally {
     
    }
  };

  return (
    <>
      <Master children = {
        <>
        <Box>
          <Element  name="Repository">
            <ClassTitle classDeclarationName="Repository" subTitle={'Persistência de entidades do DDD de forma transparente'} /> 
         
            <Typography paragraph align="left">
              A classe abstrata <Box style={{ fontWeight: 'bold', display: 'inline' }}>Repository</Box> encapsula o comportamento que direciona as ações: <Box style={{ fontWeight: 'bold', display: 'inline' }}>inclusão</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>alteração</Box> e <Box style={{ fontWeight: 'bold', display: 'inline' }}>exclusão</Box>, além de criar os <ClassLink description='interceptors'routePath={routePaths.CLASSES_ENTITY_STATE_INTERCEPTOR} previewCode={interceptoPreviewContent} /> que farão o gerenciamento de estados de forma automática.
              A seguir, um exemplo de implementação que herda de Repository. Note que o código abaixo não representa a Repository, mas sim uma classe que a estende.
            </Typography>                       
               
            <Box>
              <CodeMirror
                value={sampleRepositoryContent}
                onChange={(newValue) => setSampleRepositoryContent(newValue)}
                theme={codeEditorTheme}
                extensions={[csharp(),
                  EditorView.theme({
                    '.cm-foldGutter span': {
                      display: 'none',
                    },
                  }),
                ]}
                style={{ height: '100%',overflow: 'auto', zIndex: -1 }}                
                readOnly
              />
            </Box>

            <Typography paragraph align="left" sx={{marginTop: '20px'}}>
            A classe Repository é uma camada intermediária para a implementação em infraestrutura que irá de fato se conectar com a persistência, como o <Box style={{ fontWeight: 'bold', display: 'inline' }}>Dapper</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>EntityFramework</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>ADO. NET</Box> ou outra tecnologia de sua preferência.<br/>
            O código de infra estrutura, baseado no framework a sua escolha, se dará com a implementação da interface <ClassLink description='ICqrsCommandProvider' routePath={routePaths.CLASSES_INTERFACE_COMMAND_PROVIDER} previewCode={interfaceCqrsCommandProviderPreviewContent} />.
            </Typography>
             
          </Element>
          <Element name="Lógica do Repository" >
            <Typography variant="h4" sx={{marginTop: '20px'}}>Lógica do Repository</Typography>
              <Typography paragraph align="left" sx={{marginTop: '10px'}}>
              O Repository verifica o atributo <ClassLink description='State'routePath={routePaths.CLASSES_ENTITY_STATE} previewCode={entityStateContent} /> da entidade e, de forma automática, direciona para os métodos da classe que implementa a ICqrsCommandProvider, sem a necessidade do programador incluir uma lógica para incluir, alterar ou excluir as suas entidades. Além disso, o Repository também possui um método para criar os interceptors logo após a recuperação da camada de infra estrutura, através do command provider.<br/>
              Esses comportamentos são fixos independente da tecnologia de persistência que estiver sendo utilizada e por isso a variação de tecnologia é feita justamente na implementação da ICqrsCommandProvider.
              </Typography>
            <Box 
              component="img"
              alt="Repository aequence diagram."
              src={repositorySequanceDiagram}
              sx={{
                display: 'block',
                margin: '15px auto',
                maxWidth: '100%',
                height: 'auto',
              }}
            />

            <Alert severity="warning" sx={{marginTop: '20px'}}>
              Para que sejam criados os interceptors para a entidade, é imprescindível que no repositório seja chamada o método <Box sx={{fontWeight: 'bold', display: 'inline'}}>HandleAfterGetFromCommandProvider</Box> após o retorno de cada método Get do command provider, caso contrário a gerencia automática de estado não será ativada.
            </Alert>
          </Element>
          <Element name="Exemplo de uso">
            <Typography variant="h4" marginTop={'20px'}>Exemplo de uso</Typography>
            <Box>
              <CodeMirror
                value={sampleServiceClassContent}
                onChange={(newValue) => setSampleServiceClassContent(newValue)}
                theme={codeEditorTheme}
                extensions={[csharp(),
                  EditorView.theme({
                    '.cm-foldGutter span': {
                      display: 'none',
                    },
                  }),
                ]}
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
          <Element name="Métodos">
            <Typography variant="h4">Métodos</Typography>
             
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650}} aria-label="simple table">
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

          <Element name="Explore">
          <Typography variant="h4" sx={{marginTop: '20px'}}>Explore mais funcionalidades</Typography>

            <Alert severity="info">
            Confira também um conjunto de classes projetadas para trabalhar em sinergia com o Repository, facilitando tanto a implementação de entidades quanto da infraestrutura, e oferecendo funcionalidades que agilizam o desenvolvimento do acesso a dados.<br/>
              {bull}<ClassLink description='BaseEntity'routePath={routePaths.CLASSES_BASE_ENTITY} /><br/>
              {bull}<ClassLink description='ICqrsCommandProvider'routePath={routePaths.CLASSES_DAPPPER_CQRS_COMMAND_PROVIDER} /><br/> 
              {bull}<ClassLink description='IEntityCommand'routePath={routePaths.CLASSES_INTERFACE_COMMAND} /><br/> 
              {bull}<ClassLink description='DapperCqrsCommandProvider'routePath={routePaths.CLASSES_DAPPPER_CQRS_COMMAND_PROVIDER} /><br/> 
              {bull}<ClassLink description='DapperCommand'routePath={routePaths.CLASSES_DAPPPER_COMMAND} /><br/> 
            </Alert>     
          </Element>                      
        </Box>      
        </>
      } marks={marks} >      
        </Master>
    </>
  );
};

export default Repository;