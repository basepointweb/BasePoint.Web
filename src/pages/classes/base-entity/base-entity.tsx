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
import { routePaths } from '@shared/configs/constants/routes-path'
import ClassLink from '@/components/shared/class-link/class-link';
import ClassTitle from '@/components/shared/class-title/class-title';
import Alert from '@mui/material/Alert';
import { EditorView } from '@codemirror/view';

const marks = [
  {
    value: 70,
    label: 'BaseEntity',
  },
  {
    value: 60,
    label: 'Ciclo de vida',   
  },
  {
    value: 50,
    label: 'Gerenciamento de estado',
  },
  {
    value: 40,
    label: 'Exemplo de uso',
  },
  {
    value: 30,
    label: 'Propriedades',
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
  createData('bool', 'PropertyIsUpdated', 'Retorna se uma propriedade foi atualizada com relação ao valor recuperado do repositório'),
  createData('Dictionary<string, object>', 'GetPropertiesToPersist', 'Retorna dicionários com as propriedades inseridas/alteradas a serem persistidas'),
  createData('void', 'SetStateAsUpdated', 'Define o State como updated, caso este for Unchanged ou Persisted'),
  createData('void', 'SetStateAsDeleted', 'Define o State como Deleted, caso este for diferente de New'),
  createData('void', 'SetStateAsPersisted', 'Define o status como Persisted, caso este for New ou Updated e como PersistedDeleted caso este for Deleted'),
  createData('void', 'SetStateAsUnchanged', 'Define o State como Unchanged e inicializa o dicionário de valores persistidos'),
  createData('IBaseEntity', 'EntityClone', 'Cria um novo objeto com identificador novo e dados idênticos ao original'),
  createData('void', ' Copy', 'Copia para a instância atual todos os dados de uma outra instância, exceto o identificador'),
  createData('object', 'Clone', 'Cria um novo objeto com identificador novo e dados idênticos ao original, faz uma chamada ao método EntityClone'),
  createData('void', 'AddObserver', 'Adiciona um observador de estado da entidade'),
  createData('void','RemoveObserver', 'Remove um observador de estado da entidade'),
  createData('void','NotifyEntityObserversPropertyUpdate', 'Notifica a todos os observadores que o estado de um propriedade foi alterado'),
];

const BaseEntity = () => {
  const [sampleEntityContent, setSampleEntityContent] = useState('');
  const [sampleCommandUseCaseContent, setSampleCommandUseCaseContent] = useState('');
  const [entityStateContent, setEntityStateContent] = useState('');
  const [repositoryPreviewContent, setRepositoryPreviewContent] = useState('');
  const [entityCommandPreviewContent, setEntityCommandPreviewContent] = useState('');
  const [baseUnitOfWorkPreviewContent, setBaseUnitOfWorkPreviewContent] = useState('');  
  const [interceptoPreviewContent, setInterceptoPreviewContent] = useState('');
  const [commandUseCasePreviewContent, setCommandUseCasePreviewContent] = useState('');

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  useLayoutEffect(() => {  
    fetchSampleContents();
  }, []);

  const fetchSampleContents = async () => {
    try {

      setSampleEntityContent(`public class SampleEntity : BaseEntity
{
	public virtual string SampleName { get; set; }
	public virtual decimal MonthlySalary { get; protected set; }

	public void SetMonthlySalary(decimal monthlySalary)
	{
		if (monthlySalary <= decimal.Zero)
			throw new ValidationException(CommonTestContants.EntitySalaryMustBeGreaterThanZero);

		MonthlySalary = monthlySalary;
	}
}`)

      setSampleCommandUseCaseContent(`public class SampleCommandUseCase : CommandUseCase<UpdateApplicationInput, ApplicationOutput>
{
    private readonly IApplicationRepository _applicationRepository;
    private readonly IAccessProfileRepository _accessProfileRepository;

    protected override string SaveChangesErrorMessage => "SampleChildCommandUseCase Error message";

    public SampleCommandUseCase(
      IApplicationRepository applicationRepository,
      IAccessProfileRepository accessProfileRepository,
      IUnitOfWork unitOfWork) : base(unitOfWork)
    {
      _applicationRepository = applicationRepository;
      _accessProfileRepository = accessProfileRepository;
    }

	public override async Task<UseCaseOutput<ApplicationOutput>> InternalExecuteAsync(UpdateApplicationInput input)
	{
		var accessProfile = await _accessProfileRepository.GetByName(input.Name);

		var oldAccessProfile = await _accessProfileRepository.GetByName(input.OldName);

		oldAcessProfile.SetStateAsDeleted(); // change State to Deleted 

		accessProfile.Name = "New Name"; // change State to Updated 

		accessProfile.Functionalities.Add(new Functionality("OrderUpdate")); // change item State to New
		accessProfile.Functionalities.Remove(new Functionality("OrderSimulation")); // change item State to Deleted

		var newAccessProfile = new AccessProfile("New Acess Profile");

		_accessProfileRepository.Persist(accessProfile, UnitOfWork); // create commands for access profile ands its items
		_accessProfileRepository.Persist(oldAcessProfile, UnitOfWork); // create a delete command
		_accessProfileRepository.Persist(newAccessProfile, UnitOfWork); // create a insertion command

		_applicationRepository.Persist(new Application("Order management"), UnitOfWork); // create a insertion command

		await SaveChangesAsync(); // calls UnitOfWork SaveChangesAsync and submits all commands

		return CreateSuccessOutput(new SampleChildUseCaseOutput()
		{
			SampleId = entity.Id,
			SampleName = entity.SampleName,
		});
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

      setRepositoryPreviewContent(`
 public abstract class Repository<Entity> : IRepository<Entity>
    where Entity : IBaseEntity
{
	public virtual void Persist(Entity entity, IUnitOfWork unitOfWork)
  {...}

	public virtual async Task<Entity> GetById(Guid id)
  {...}

	protected virtual T HandleAfterGetFromCommandProvider<T>(T entity)
    where T : IBaseEntity
  {...}
}`)

setEntityCommandPreviewContent(`using Best.Practices.Core.Domain.Entities.Interfaces;

namespace Best.Practices.Core.Domain.Cqrs
{
    public interface IEntityCommand
    {
        IBaseEntity AffectedEntity { get; }
        Task<bool> ExecuteAsync();
    }
}`)

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

setBaseUnitOfWorkPreviewContent(`public abstract class BaseUnitOfWork : IUnitOfWork
{
	public virtual async Task<bool> SaveChangesAsync()
	{
		try
		{
			foreach (var command in Commands)
			{
				sucess = await command.ExecuteAsync();
			}
		}
		catch (Exception)
		{
			sucess = false;
		}	

		return sucess;
	}
}`)

setCommandUseCasePreviewContent(`public abstract class CommandUseCase<Input, Output>(IUnitOfWork unitOfWork)
	: BaseUseCase<Input, Output>
{
	protected virtual async Task SaveChangesAsync()
	{
		if (!await UnitOfWork.SaveChangesAsync())
		{
			await UnitOfWork.RollbackAsync();

			throw new ExecutionErrorException(SaveChangesErrorMessage);
		}
	}
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
          <Element  name="BaseEntity">
            <ClassTitle classDeclarationName="BaseEntity" subTitle={'Gerenciamento eficiente de estados em entidades DDD'} /> 
         
            <Typography paragraph align="left">
              A classe abstrata <Box style={{ fontWeight: 'bold', display: 'inline' }}>BaseEntity</Box> simplifica a implementação de entidades no DDD, oferecendo uma base robusta e eficiente.
              A seguir, um exemplo de implementação que herda de BaseEntity. Note que o código abaixo não representa a BaseEntity, mas sim uma classe que a estende.
            </Typography>                       
               
            <Box>
              <CodeMirror
                value={sampleEntityContent}
                onChange={(newValue) => setSampleEntityContent(newValue)}
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
            A classe BaseEntity fornece uma variedade de métodos que podem ser sobrescritos conforme necessário. No entanto, como ilustrado anteriormente, é possível obter os principais benefícios da classe com uma implementação mínima.
            </Typography>   
          </Element>
          <Element name="Ciclo de vida" >
            <Typography variant="h4" sx={{marginTop: '20px'}}>Ciclo de vida da entidade</Typography>
              <Typography paragraph align="left" sx={{marginTop: '10px'}}>
              No DDD, uma entidade é um objeto com identidade única, o que a diferencia de outros objetos, mesmo que compartilhem atributos semelhantes. As entidades possuem um ciclo de vida que abrange criação, armazenamento, recuperação e exclusão.
              </Typography>
            <Box 
              component="img"
              alt="DDD lifecycle."
              src={dddLifeCycle}
              sx={{
                display: 'block',
                margin: '15px auto',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Element >
          <Element name="Gerenciamento de estado">
            <Typography variant="h4">Gerenciamento de estado</Typography>
          
            <Typography paragraph align="left">
             Para gerenciar os estados das entidades, a BaseEntity utiliza um identificador e um atributo <ClassLink description='State'routePath={routePaths.CLASSES_ENTITY_STATE}  previewCode={entityStateContent} />, que pode assumir os seguintes valores: <Box style={{ fontWeight: 'bold', display: 'inline' }}>New</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>Persisted</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>Unchanged</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>Updated</Box>, <Box style={{ fontWeight: 'bold', display: 'inline' }}>Deleted</Box> e <Box style={{ fontWeight: 'bold', display: 'inline' }}>PersistedDeleted</Box>.
            </Typography>
            <Typography paragraph sx={{ textIndent: '1em' }} align="left">
              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>
                Criação de Entidade:</Box> Quando uma nova entidade é criada, seu State  é definido como <Box style={{ fontWeight: 'bold', display: 'inline' }}> New</Box>.
                Ao ser submetida ao
                <ClassLink description='Repository'routePath={routePaths.CLASSES_REPOSITORY} previewCode={repositoryPreviewContent} />, um comando de inserção é gerado.
            </Typography>
            <Typography paragraph sx={{ textIndent: '1em' }} align="left">
              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Seleção de Entidade:</Box> Entidades recuperadas do repositório têm seu State definido como <Box style={{ fontWeight: 'bold', display: 'inline' }}>Unchanged</Box>. O repositório usa <ClassLink description='interceptors'routePath={routePaths.CLASSES_ENTITY_STATE_INTERCEPTOR} previewCode={interceptoPreviewContent} /> para monitorar e gerenciar esse estado.
            </Typography>
            <Typography paragraph sx={{ textIndent: '1em' }} align="left">
              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Atualização de Entidade:</Box> Se, após a recuperação do repositório, uma propriedade da entidade em memória é alterada, o State muda para <Box style={{ fontWeight: 'bold', display: 'inline' }}>Updated</Box>. Submeter a entidade ao repositório gera um comando de atualização.
            </Typography>
            <Typography paragraph sx={{ textIndent: '1em' }} align="left">
              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Exclusão de Entidade:</Box> Para excluir uma entidade com State igual a <Box style={{ fontWeight: 'bold', display: 'inline' }}>Unchanged</Box>, utilize o método SetStateAsDeleted(). Isso altera o State para <Box style={{ fontWeight: 'bold', display: 'inline' }}>Deleted</Box> e cria um comando de exclusão ao ser submetida ao repositório.
            </Typography>
            <Typography paragraph align="left">
              Os estados <Box style={{ fontWeight: 'bold', display: 'inline' }}>Persisted</Box> e <Box style={{ fontWeight: 'bold', display: 'inline' }}>PersistedDeleted</Box> são atribuídos à entidade após a submissão ao repositório. O estado  
              
              O estado <Box style={{ fontWeight: 'bold', display: 'inline' }}>Persisted</Box> corresponde a entidades com State <Box style={{ fontWeight: 'bold', display: 'inline' }}>New</Box> ou <Box style={{ fontWeight: 'bold', display: 'inline' }}>Updated</Box>, enquanto <Box style={{ fontWeight: 'bold', display: 'inline' }}>PersistedDeleted</Box> corresponde ao estado Deleted.
            </Typography>
            <Typography paragraph align="left">
             Para operações de inclusão, alteração e exclusão, chame o método Persist do Repository. Este método cria um <ClassLink description='IEntityCommand'routePath={routePaths.CLASSES_INTERFACE_COMMAND} previewCode={entityCommandPreviewContent} /> adequado para a operação, eliminando a necessidade de estruturas de decisão complexas.
            </Typography>

            <Typography paragraph align="left">
              Após a geração dos comandos, use o método <Box sx={{display: 'inline'}}>SaveChangesAsync</Box> da <ClassLink description='BaseUnitOfWork' routePath={routePaths.CLASSES_BASE_UNIT_OF_WORK} previewCode={baseUnitOfWorkPreviewContent} /> para garantir que todos os comandos sejam aplicados à persistência e, caso houvem operações com múltiplas entidades ou entidades com listas de itens, todas as operações serão executadas conforme o estado de cada objeto.
            </Typography>

            <Alert severity="warning" sx={{marginTop: '20px'}}>
              Para implementar a alteração automática de estado, as propriedades da entidade (definidas com <Box sx={{fontWeight: 'bold', display: 'inline'}}>get/set</Box>) devem ser declaradas com o modificador virtual.<br/>
              Isso permite que o interceptor criado pelo repositório monitore e gerencie alterações automaticamente.<br/><br/>

              <Box sx={{fontWeight: 'bold', display: 'inline'}}>Atualização Interna: </Box>Quando for necessário atualizar uma propriedade internamente em um método da classe, utilize o método <Box sx={{fontWeight: 'bold', display: 'inline'}}>NotifyEntityObserversPropertyUpdate</Box> herdado da BaseEntity. Esse método garante que os observadores da entidade sejam notificados sobre a atualização, permitindo que o rastreamento de mudanças ajuste o State da entidade conforme necessário.
            </Alert>

            <Typography paragraph align="left" sx={{marginTop: '20px'}}>
            <Box sx={{fontWeight: 'bold', display: 'inline'}}>Nota: </Box>
            Se estiver implementando um use case que herda de <ClassLink description='CommandUseCase' routePath={routePaths.CLASSES_COMMAND_USE_CASE} previewCode={commandUseCasePreviewContent} />, o método <Box sx={{display: 'inline'}}>SaveChangesAsync</Box> do use case já invoca automaticamente o método <Box sx={{display: 'inline'}}>SaveChangesAsync</Box> da UnitOfWork.
            </Typography>
          </Element>
          <Element name="Exemplo de uso">
            <Typography variant="h4" marginTop={'20px'}>Exemplo de uso</Typography>
            <Box>
              <CodeMirror
                value={sampleCommandUseCaseContent}
                onChange={(newValue) => setSampleCommandUseCaseContent(newValue)}
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

          <Element name="Propriedades">
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
          <Element name="Métodos">
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

          <Element name="Explore">
          <Typography variant="h4" sx={{marginTop: '20px'}}>Explore mais funcionalidades</Typography>

            <Alert severity="info">
              Confira também um conjunto de classes projetadas para se integrar perfeitamente com a BaseEntity, oferecendo funcionalidades poderosas e essenciais para o desenvolvimento<br/>
              {bull}<ClassLink description='Repository'routePath={routePaths.CLASSES_REPOSITORY} /><br/>
              {bull}<ClassLink description='DapperCommand'routePath={routePaths.CLASSES_DAPPPER_COMMAND} /><br/>            
              {bull}<ClassLink description='IBaseEntityEntension'routePath={routePaths.CLASSES_REPOSITORY} /><br/>           
              {bull}<ClassLink description='EntityExtension'routePath={routePaths.CLASSES_REPOSITORY} /><br/> 
              {bull}<ClassLink description='EntityList'routePath={routePaths.CLASSES_REPOSITORY} /><br/> 
              {bull}<ClassLink description='ICqrsCommandProvider'routePath={routePaths.CLASSES_DAPPPER_CQRS_COMMAND_PROVIDER} /><br/> 
              {bull}<ClassLink description='DapperCqrsCommandProvider'routePath={routePaths.CLASSES_DAPPPER_CQRS_COMMAND_PROVIDER} /><br/> 
            </Alert>     
          </Element>                      
        </Box>      
        </>
      } marks={marks} >      
        </Master>
    </>
  );
};

export default BaseEntity;