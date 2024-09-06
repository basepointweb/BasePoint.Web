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

import { routePaths } from '@shared/configs/constants/routes-path'
import ClassLink from '@/components/shared/class-link/class-link';
import ClassTitle from '@/components/shared/class-title/class-title';
import Alert from '@mui/material/Alert';
import { EditorView } from '@codemirror/view';

const marks = [
  {
    value: 60,
    label: 'EntityList',
  },
  {
    value: 50,
    label: 'Funcionamento da EntityList',   
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
  createData('IBaseEntity', 'Parent', ''),
  createData('List<Entity>', 'AllItems', ''),
  createData('IList<Entity>', 'Items', ''),
  createData('IList<Entity>', 'DeletedItems', ''),
  createData('bool', 'IsFixedSize', ''),
  createData('bool', 'IsReadOnly', ''),
  createData('object', 'IList.this[int index]', ''),
  createData('Entity', 'this[int index]', ''),
  createData('bool', 'IsSynchronized', ''),
  createData('object', 'SyncRoot', ''),
  createData('int', 'Count', ''),
];

const methods = [
  createData('EntityList', 'EntityList', ''),    
  createData('EntityList', 'EntityList(IBaseEntity parent)', ''),    
  createData('EntityList', 'EntityList(int capacity)', ''),    
  createData('EntityList', 'EntityList(IEntityList<Entity> entities)', ''),    
  createData('EntityList', 'EntityList(IEntityList<Entity> entities, IBaseEntity parent)', ''),    
  createData('EntityList', 'EntityList(int capacity, IBaseEntity parent)', ''),   
  createData('int', 'IndexOf(Entity item)', ''),  
  createData('void', 'Insert(int index, Entity item)', ''),  
  createData('void', 'RemoveAt(int index)', ''),  
  createData('void', 'Add(Entity item)', ''),  
  createData('void', 'AddRange(IEnumerable<Entity> items)', ''),  
  createData('void', 'Clear()', ''),  
  createData('bool', 'Contains(Entity item)', ''),  
  createData('bool', 'Contains(object value)', ''),  
  createData('void', 'CopyTo(Entity[] array, int arrayIndex)', ''),  
  createData('void', 'CopyTo(Array array, int index)', ''),  
  createData('bool', 'Remove(Entity item)', ''),  
  createData('int', 'RemoveAll(Predicate<Entity> match)', ''),  
  createData('IEnumerator<Entity>', 'GetEnumerator()', ''),  
  createData('IEnumerator', 'IEnumerable.GetEnumerator()', ''),  
  createData('int', 'Add(object value)', ''),  
 
];

const EntityList = () => {
  const [sampleClassWithEntityListContent, setSampleClassWithEntityListContent] = useState('');
  const [sampleServiceClassContent, setSampleServiceClassContent] = useState('');
  const [interfaceCqrsCommandProviderPreviewContent, setinterfaceCqrsCommandProviderPreviewContent] = useState('');
  const [repositoryPreviewContent, setRepositoryPreviewContent] = useState('');
  const [entityCommandPreviewContent, setEntityCommandPreviewContent] = useState('');
  const [dapperCommandPreviewContent, setDapperCommandPreviewContent] = useState('');  

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  useLayoutEffect(() => {
    fetchSampleContents();
  }, []);

  const fetchSampleContents = async () => {
    try {

      setDapperCommandPreviewContent(`public class ShoppingCartCommand : DapperCommand<ShoppingCart>
{
	public ShoppingCartCommand(MySqlConnection connection, ShoppingCart affectedEntity)
		: base(connection, affectedEntity)
	{
		AddTypeMapping(nameof(ShoppingCart), DapperShoppingCartTableDefinition.TableDefinition)
			.WithParentEntity(nameof(ShoppingCart.OwnerUser), affectedEntity.OwnerUser);

		AddTypeMapping(nameof(FeatureFlag), DapperShoppingCartItemTableDefinition.TableDefinition)
			.WithParentEntity(nameof(ShoppingCart), affectedEntity);
	}

	public override IList<CommandDefinition> CreateCommandDefinitions(ShoppingCart entity)
	{
		CreateCommandDefinitionByState(entity);

		CreateCommandDefinitionByState(entity.Items.AllItems);

		return CommandDefinitions;
	}
}`)

      setRepositoryPreviewContent(`public abstract class Repository<Entity> : IRepository<Entity>
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

      setSampleClassWithEntityListContent(`public class ShoppingCartItem : BaseEntity {...}

public class ShoppingCart : BaseEntity
{
	public virtual IEntityList<ShoppingCartItem> Items { get; protected set; }
	
	public virtual string OrderCode { get; protected set; }
	
	public ShoppingCart()
	{
		Items = new EntityList<ShoppingCartItem>(this); // set this entity as Parent
	}

	public void AddItem(ShoppingCartItem item)
	{
		Items.Add(item);
	}
}`)

      setSampleServiceClassContent(`public class ServiceClass : IServiceClass
{
    private readonly IShoppingCartRepository _shoppingCartRepository;   
	private readonly IUnitOfWork _unitOfWork;
	
	// contructors here
	
	public override async Task ExecuteAsync(string orderCode)
	{
		// if shoppingCart has 3 items 
		var shoppingCart = await _shoppingCartRepository.GetByOrderCode(orderCode);
		// shoppingCart and its all items.State = Unchanged
		
		var firstItem = shoppingCart.Items.First();
		var lastItem = shoppingCart.Items.Last();
		
		var newItem = new ShoppingCartItem(...); // newItem.State = New
		
		lastItem.Amount = 100; // sets lastItem.State = Updated and shoppingCart.State = Updated 
		
		shoppingCart.Items.Remove(firstItem); // sets lastItem.State = Deleted and shoppingCart.State = Updated  
		
		shoppingCart.Items.Add(newItem); // sets shoppingCart.State = Updated
		
		_accessProfileRepository.Persist(accessProfile, _unitOfWork); // create commands for shoppingCart and its items
	}
}`)

setinterfaceCqrsCommandProviderPreviewContent(`public interface IShoppingCartCqrsCommandProvider : ICqrsCommandProvider<ShoppingCart>
{
	Task<ShoppingCart> GetByOrderCode(string orderCode);
}

// In another assembly
public class ShoppingCartCqrsCommandProvider : DapperCqrsCommandProvider<ShoppingCart>, IShoppingCartCqrsCommandProvider
{
	public override IEntityCommand GetAddCommand(ShoppingCart entity)
	{
		return new ShoppingCartCommand((MySqlConnection)_connection, entity);
	}

	public override IEntityCommand GetDeleteCommand(ShoppingCart entity)
	{
		return new ShoppingCartCommand((MySqlConnection)_connection, entity);
	}

	public override IEntityCommand GetUpdateCommand(ShoppingCart entity)
	{
		return new ShoppingCartCommand((MySqlConnection)_connection, entity);
	}
	
	public override async Task<ShoppingCart> GetById(Guid id)
	{...}

	public async Task<ShoppingCart> GetByName(string name)
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
          <Element  name="EntityList">
            <ClassTitle classDeclarationName="EntityList" subTitle={'Gerenciamento eficiente de estado em listas de entidades DDD'} /> 
         
            <Typography paragraph align="left">
              A classe <Box style={{ fontWeight: 'bold', display: 'inline' }}>EntityList</Box> gerencia o estado de uma lista de itens e da entidade que contém esses itens à medida que são inseridos, atualizados ou excluídos. Dessa forma, ao submeter os dados ao <ClassLink description='ICqrsCommandProvider' routePath={routePaths.CLASSES_INTERFACE_COMMAND_PROVIDER} previewCode={interfaceCqrsCommandProviderPreviewContent} />, os comandos necessários para as operações de inclusão, alteração e exclusão são automaticamente criados.<br/>
              Abaixo, apresentamos um exemplo de implementação que utiliza a EntityList.
            </Typography>
            <Box>
              <CodeMirror
                value={sampleClassWithEntityListContent}
                onChange={(newValue) => setSampleClassWithEntityListContent(newValue)}
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
            Alterar uma entidade com uma lista de itens pode ser complexo, pois itens novos devem ser incluídos, itens modificados precisam ser atualizados, e itens excluídos devem ser removidos. A EntityList, em conjunto com a BaseEntity, simplifica essa tarefa, eliminando a necessidade de lógicas complexas para determinar a operação adequada para cada item.
            </Typography>
             
          </Element>
          <Element name="Funcionamento da EntityList" >
            <Typography variant="h4" sx={{marginTop: '20px'}}>Funcionamento da EntityList</Typography>
              <Typography paragraph align="left" sx={{marginTop: '10px'}}>
                A EntityList tem duas listas internas: Items e DeletedItems. Quando um item é adicionado, ele é alocado em Items, a menos que se State seja <Box style={{ fontWeight: 'bold', display: 'inline' }}>Deleted</Box>, pois assim será alocado em DeletedItems. Se um item é removido e seu estado for
                <Box style={{ fontWeight: 'bold', display: 'inline' }}> Unchanged</Box>,
                <Box style={{ fontWeight: 'bold', display: 'inline' }}> Persisted</Box>,
                <Box style={{ fontWeight: 'bold', display: 'inline' }}> Updated</Box>,
                <Box style={{ fontWeight: 'bold', display: 'inline' }}> Deleted</Box> ou 
                <Box style={{ fontWeight: 'bold', display: 'inline' }}> PersistedDeleted</Box>, ele é movido para DeletedItems. Isso permite que, ao submeter os dados ao <ClassLink description='Repository' routePath={routePaths.CLASSES_REPOSITORY} previewCode={repositoryPreviewContent} />, possamos gerenciar itens deletados junto com os incluídos e alterados, eliminando a necessidade de submeter exclusões enquanto o usuário ainda realiza alterações e facilitando o controle de transações.<br/><br/>
                EntityList permite definir uma entidade pai. A vantagem é que, quando qualquer item na lista é incluído, alterado ou removido, o State da entidade pai, caso estiver anteriormente como <Box style={{ fontWeight: 'bold', display: 'inline' }}>Unchanged</Box> ou <Box style={{ fontWeight: 'bold', display: 'inline' }}>Persisted</Box>, é automaticamente definido como <Box style={{ fontWeight: 'bold', display: 'inline' }}> Updated</Box>. Isso simplifica operações onde a entidade e seus itens são recuperados e modificados, eliminando a necessidade de estruturas de decisão complexas ao alterar uma raiz do agregado quando um item é modificado.<br/>
                Além disso a EntityList possui uma propriedade AllItems que retornará todos os itens concatenados das listas DeletedItems e Items. Isso é útil para leitura dos items de forma unificada na hora da persistência.<br/><br/>
                <Box style={{ fontWeight: 'bold', display: 'inline' }}>Nota: </Box>

                Para gerar os comandos correspondentes ao estado dos itens de uma entidade submetida ao repositório, a classe que implementa <ClassLink description='IEntityCommand'routePath={routePaths.CLASSES_INTERFACE_COMMAND} previewCode={entityCommandPreviewContent} /> deve utilizar as propriedades <Box style={{ fontWeight: 'bold', display: 'inline' }}>Items</Box> e <Box style={{ fontWeight: 'bold', display: 'inline' }}>DeletedItems</Box> em conjunto, ou a propriedade <Box style={{ fontWeight: 'bold', display: 'inline' }}>AlItems</Box>, direcionando-as para os métodos de inclusão, alteração ou exclusão apropriados.<br/>

                Se você estiver utilizando o Dapper, nossa classe <ClassLink description='DapperCommand' routePath={routePaths.CLASSES_DAPPPER_COMMAND} previewCode={dapperCommandPreviewContent} /> simplifica o processo, automatizando a criação de comandos para inserção, atualização e exclusão de dados.
              </Typography>

              <Alert severity="info" sx={{marginTop: '20px'}}>
                A classe EntityList implementa as interfaces <Box style={{ fontWeight: 'bold', display: 'inline' }}>ICollection</Box> e <Box style={{ fontWeight: 'bold', display: 'inline' }}>IList</Box>, o que também a torna uma <Box style={{ fontWeight: 'bold', display: 'inline' }}>IEnumerable</Box> e portanto podendo ser usada em qualquer lugar onde essas interfaces são aplicáveis.
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
            <Alert severity="warning" sx={{marginTop: '20px'}}>
             No exemplo acima demostramos diretamente a chamada aos métodos Add e Remove da EntityList somente para fins didáticos, porém recomendamos o uso de boas práticas e o acesso da lista somente através de métodos da raiz do agregado.
            </Alert>
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
            Confira também um conjunto de classes projetadas para trabalhar em sinergia com a EntityList, facilitando tanto a implementação de entidades quanto da infraestrutura, e oferecendo funcionalidades que agilizam o desenvolvimento da persistência.<br/>
              {bull}<ClassLink description='BaseEntity'routePath={routePaths.CLASSES_BASE_ENTITY} /><br/>
              {bull}<ClassLink description='IEntityCommand'routePath={routePaths.CLASSES_INTERFACE_COMMAND} /><br/> 
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

export default EntityList;