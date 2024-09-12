
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import GitHubIcon from '@mui/icons-material/GitHub'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { useRef, useState, useEffect } from 'react'
import { csharp } from "@replit/codemirror-lang-csharp"
import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { codeEditorTheme } from '@shared/configs/constants/themes'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '12px', transform: 'scale(1.8)' }}
  >
    •
  </Box>
);

const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const codeEntitySample = `public class Person : BaseEntity
{
	public virtual string Name { get; protected set; }

	public virtual string LastName { get; protected set; }

	public virtual decimal MonthlySalary { get; protected set; }

	public virtual int Age { get; protected set; }

	public void SetMonthlySalary(decimal monthlySalary)
	{
		if (monthlySalary <= decimal.Zero)
			throw new ValidationException(Contants.MustBeGreaterThanZero);

		MonthlySalary = monthlySalary;
	}

	public bool IsUnderAge()
	{
		return Age < 18;
	}

	public bool IsElder()  => return (Age >= 65);
}`
const codeRepositorySample = `public class SampleRepository : Repository<SampleEntity>, ISampleRepository
{
    private readonly ISampleCqrsCommandProvider _provider;

    public SampleRepository(ISampleCqrsCommandProvider provider)
      : base(commandProvider)
    {
        _provider = provider;
    }

    public async Task<SampleEntity> GetByCode(string code)
    {
        return HandleAfterGetFromCommandProvider(await _provider.GetByCode(code));
    }

    public async Task<SampleEntity> GetByName(string name)
    {
        return HandleAfterGetFromCommandProvider(await _provider.GetByName(name));
    }

    public async Task<SampleEntity> GetByNumber(string number)
    {
        return HandleAfterGetFromCommandProvider(await _provider.GetByNumber(number));
    }
}`
const codeDapperCommandSample = `public class ApplicationCqrsCommandProvider
 : DapperCqrsCommandProvider<Application>, IApplicationCqrsCommandProvider
{
	public ApplicationCqrsCommandProvider(
      MySqlConnection connection) : base(connection)
	{
	}

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
	
	public override async Task<Application> GetById(Guid id) {...}
}`
const codeUseCaseSample = `public class SampleCommandUseCase
 : CommandUseCase<UpdateApplicationInput, ApplicationOutput>
{
    private readonly IAccessProfileRepository _accessProfileRepository;

    protected override string SaveChangesErrorMessage => "Sample Error message";

	public override async Task<UseCaseOutput<ApplicationOutput>> InternalExecuteAsync(
      UpdateApplicationInput input)
	{
		var accessProfile = await _accessProfileRepository.GetByName(input.Name);
		
		accessProfile.Name = "New Name";

		_accessProfileRepository.Persist(accessProfile, UnitOfWork);

		await SaveChangesAsync();
		
		return CreateSuccessOutput(new ApplicationOutput()
		{
			SampleId = accessProfile.Id,
			Name = accessProfile.Name,
		});
	}
}`

function Home() {
  const navigate = useNavigate();
  const entityRef = useRef(null);
  const repositoryRef = useRef(null);
  const usecaseRef = useRef(null);
  const dapperCommandRef = useRef(null);
  const [selectedCodeSample, setSelectedCodeSample] = useState('');  

  const boxReferences = [entityRef, repositoryRef, usecaseRef, dapperCommandRef]

  const boxReferenceSamples = new Map([
     [entityRef.current,codeEntitySample],
     [repositoryRef.current, codeRepositorySample],
     [usecaseRef.current, codeUseCaseSample],
     [dapperCommandRef.current, codeDapperCommandSample]])

  const selectedFirstCodeSample = (): void => {
    if (entityRef.current != null) {
      boxReferences.forEach(boxReference => {
        boxReference.current.style.backgroundColor = (boxReference.current === entityRef.current)? '#f0f7ff' : 'red'
        boxReference.current.style.borderColor = 'red'
      });

      setSelectedCodeSample(codeEntitySample)
    }     
  }

  const handleClassSampleClick = (event): void => {
    const clickedBox = event.currentTarget;

    boxReferences.forEach(boxReference => {
      boxReference.current.style.backgroundColor = (boxReference.current === clickedBox)? '#f0f7ff' : 'red'
      boxReference.current.style.borderColor = 'red'
    });

    setSelectedCodeSample(boxReferenceSamples.get(clickedBox))
  }

  useEffect(() => { 
    selectedFirstCodeSample()  
  }, []);

return (
    <>
      <Box sx={{backgroundColor: 'whiteSmoke', background: "linear-Gradient(to bottom right, red, yellow, blue)"}}>    
        <Grid      
          container
          direction="row"    
          justifyContent="center"
          style={{  }}
        >
          <Grid item xs={9}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                padding: '8px',
              }}
            >
              <Box
                sx={{
                  width: '100%',             
                  textAlign: 'center',
                  lineHeight: '100px',
                  marginTop: '200px'
                }}
              >
                <Box style={{ }}>
                  <Typography variant="h2" sx={{color: 'white'}}>Framework Back-end</Typography>
                  <Typography variant="h2" sx={{color: 'white'}}>para rápido desenvolvimento</Typography>
                  <Typography paragraph>
                    BasePoint Framework oferece ferramentas para criar aplicações robustas e modernas, permitindo que você foque no seu negócio.
                  </Typography>   
                  <Button
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}
                    onClick={ () => {navigate('/getting-started')}}
                    sx={{
                      textTransform: 'none'
                    }}>
                    Getting Started
                  </Button>

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

                  <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px',
                    }}
                    >
                      <Box sx={{ minWidth: 500, width: '49%'}}>   
                        <Typography variant="h4" textAlign="left">Todas as <Box style={{ fontWeight: 'bold', display: 'inline', color: '#4eb67e' }}>classes</Box> que precisa</Typography>
                        <Typography variant="h4" textAlign="left">estão prontas para uso</Typography>

                        <Box
                           ref={entityRef}                            
                           onClick={handleClassSampleClick}
                           sx={{
                           cursor:'pointer',
                           display: 'flex',
                           alignItems: 'center',
                           padding: '16px',
                           borderRadius: '8px',
                           backgroundColor: 'theme.palette.background.paper',
                           border: '1px solid #e0e0e0',
                           marginBottom: '10px',
                           boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                           maxWidth: '400px', // ajuste conforme necessário
                           transition: 'background-color 0.3s ease', // Transição suave para mudança de cor
                           '&:hover': {
                             backgroundColor: '#f0f7ff', // Cor estimada da imagem quando o mouse passa
                           },
                        }}>
                        <YouTubeIcon sx={{ color: '#1976d2', marginRight: '8px' }} /> 
                        <Box>
                          <Typography variant="subtitle1" align='left' sx={{ fontWeight: 'bold' }}>
                            Entidade
                          </Typography>
                          <Typography variant="subtitle2">
                            Componente central do DDD
                          </Typography>
                        </Box>                    
                        </Box>                        
                        <Box
                           ref={repositoryRef} 
                           onClick={handleClassSampleClick}
                           sx={{
                           cursor:'pointer',
                           display: 'flex',
                           alignItems: 'center',
                           padding: '16px',
                           borderRadius: '8px',
                           backgroundColor: 'theme.palette.background.paper',
                           border: '1px solid #e0e0e0',
                           marginBottom: '10px',
                           boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                           maxWidth: '400px', // ajuste conforme necessário
                           transition: 'background-color 0.3s ease', // Transição suave para mudança de cor
                           '&:hover': {
                             backgroundColor: '#f0f7ff', // Cor estimada da imagem quando o mouse passa
                           },
                        }}>
                        <YouTubeIcon sx={{ color: '#1976d2', marginRight: '8px' }} /> 
                        <Box>
                          <Typography variant="subtitle1" align='left' sx={{ fontWeight: 'bold' }}>
                          Repositório
                          </Typography>
                          <Typography variant="subtitle2">
                          Persistência com gerência de estado
                          </Typography>
                        </Box> 
                        </Box>

                        <Box
                           ref={dapperCommandRef}
                           onClick={handleClassSampleClick}
                           sx={{
                           cursor:'pointer',
                           display: 'flex',
                           alignItems: 'center',
                           padding: '16px',
                           borderRadius: '8px',
                           backgroundColor: 'theme.palette.background.paper',
                           border: '1px solid #e0e0e0',
                           marginBottom: '10px',
                           boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                           maxWidth: '400px', // ajuste conforme necessário
                           transition: 'background-color 0.3s ease', // Transição suave para mudança de cor
                           '&:hover': {
                             backgroundColor: '#f0f7ff', // Cor estimada da imagem quando o mouse passa
                           },
                        }}>
                        <YouTubeIcon sx={{ color: '#1976d2', marginRight: '8px' }} /> 
                        <Box>
                          <Typography variant="subtitle1" align='left' sx={{ fontWeight: 'bold' }}>
                          DapperCommand
                          </Typography>
                          <Typography variant="subtitle2">
                          Persistência sem queries de insert update e delete
                          </Typography>
                        </Box> 
                        </Box>

                        <Box
                          ref={usecaseRef}
                          onClick={handleClassSampleClick}
                          sx={{
                           cursor:'pointer',
                           display: 'flex',
                           alignItems: 'center',
                           padding: '16px',
                           borderRadius: '8px',
                           backgroundColor: 'theme.palette.background.paper',
                           border: '1px solid #e0e0e0',
                           marginBottom: '10px',
                           boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                           maxWidth: '400px', // ajuste conforme necessário
                           transition: 'background-color 0.3s ease', // Transição suave para mudança de cor
                           '&:hover': {
                             backgroundColor: '#f0f7ff', // Cor estimada da imagem quando o mouse passa
                           },
                        }}>
                        <YouTubeIcon sx={{ color: '#1976d2', marginRight: '8px' }} /> 
                        <Box>
                          <Typography variant="subtitle1" align='left' sx={{ fontWeight: 'bold' }}>
                          UseCase
                          </Typography>
                          <Typography variant="subtitle2">
                          Criação das funcionalidades do usuáros
                          </Typography>
                        </Box>                      
                        </Box>
                      </Box>                                        

                      <Box sx={{ minWidth: 500, width: '100%', height: '100%'}}>
                      <CodeMirror
                        value={selectedCodeSample}        
                        onChange={(newValue) => setSelectedCodeSample(newValue)}            
                        theme={codeEditorTheme}
                        extensions={[csharp(),
                          EditorView.theme({
                            '.cm-foldGutter span': {
                              display: 'none',
                            },
                          }),
                        ]}
                        style={{ width: '100%', height: '100%',overflow: 'auto', zIndex: -1, textAlign: 'left' }}                
                        readOnly
                      />
                      </Box>
                  </Box>  

                  <Typography variant="h4">Framework Open source</Typography>
                  <Typography paragraph>
                    Conte com uma extensa biblioteca de classes com funcionalidades úteis para sua dia-dia de desenvolvimento
                  </Typography>

                  <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px',
                    }}
                    >
                      <Card sx={{ minWidth: 500, width: '49%'}}>
                        <CardContent>
                            <Typography variant="h6" textAlign="left">
                            Arquitetura
                            </Typography>
                            <Typography variant="subtitle1" textAlign="left"  color="text.secondary">
                            Utilize a arquitetura limpa para manter seu software organizado 
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Liberdade para escolher sua infraestrutura</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Se encaixa em qualquer interface de usuário</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Implemente a persistência em qualquer banco de dados</Box>
                            </Typography>
                            
                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Construa aplicações 100% testáveis</Box>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {openInNewTab('https://www.nuget.org/packages/Best.Practices.Core/')}}>Saiba mais</Button>
                        </CardActions>
                      </Card>

                      <Card sx={{ minWidth: 500, width: '49%'}}>
                        <CardContent>
                            <Typography variant="h6" textAlign="left">
                            Infraestrutura
                            </Typography>
                            <Typography variant="subtitle1" textAlign="left"  color="text.secondary">
                            Back-end completo para seu dia a dia 
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Validações, tratamento de exceções</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Tokens JWT</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Unit of work</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Filtro de dados com paginação</Box>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {openInNewTab('https://www.nuget.org/packages/Best.Practices.Core/')}}>Saiba mais</Button>
                        </CardActions>
                      </Card>
                  </Box>  
                  <Button
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}
                    onClick={ () => {navigate('/getting-started')}}
                    sx={{
                      textTransform: 'none'
                    }}>
                    Explore o framework
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    onClick={() => {
                      openInNewTab('https://github.com/eliassilvadev/best-practices/tree/main/Best.Practices.Core');
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

                  <Typography variant="h4">Gerador de código</Typography>
                  <Typography variant="subtitle1">
                  Acelere o desenvolvimento com estrutura baseada no DDD e na Clean Architecture
                  </Typography>
                  <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px',
                    }}
                    >
                      <Card sx={{ minWidth: 500, width: '49%'}}>
                        <CardContent>
                            <Typography variant="h6" textAlign="left">
                            Domínio
                            </Typography>
                            <Typography variant="subtitle1" textAlign="left"  color="text.secondary">
                            Gere as classes que serão o core da aplicação
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Repositórios</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Interfaces para abstração de acessos a dados</Box>
                            </Typography>
                            
                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Testes de unidade</Box>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {navigate('getting-started/generator')}}>Saiba mais</Button>
                        </CardActions>
                      </Card>

                      <Card sx={{ minWidth: 500, width: '49%'}}>
                        <CardContent>
                            <Typography variant="h6" textAlign="left">
                            Aplicação
                            </Typography>
                            <Typography variant="subtitle1" textAlign="left"  color="text.secondary">
                            Criação das classes que representação o requisitos do usuário
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Use Cases de alteração de estado e consulta</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Dtos de entrada e saída</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Validadores das entradas e saídas</Box>
                            </Typography>
                            
                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Testes de unidade</Box>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {navigate('getting-started/generator')}}>Saiba mais</Button>
                        </CardActions>
                      </Card>
                  </Box>

                  <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px',
                    }}
                    >
                      <Card sx={{ minWidth: 500, width: '49%'}}>
                        <CardContent>
                            <Typography variant="h6" textAlign="left">
                            Apresentação
                            </Typography>
                            <Typography variant="subtitle1" textAlign="left"  color="text.secondary">
                            Disponibilize sua aplicação por meio de APIs rest
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Endpoints para verbos put, post, delete</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Endpoints de consultas paginada e de detalhes, ideal para listagem e edição</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Autenticação com tokens para proteger seus endpoints</Box>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {navigate('getting-started/generator')}}>Saiba mais</Button>
                        </CardActions>
                      </Card>

                      <Card sx={{ minWidth: 500, width: '49%'}}>
                        <CardContent>
                            <Typography variant="h6" textAlign="left">
                            Infraestrutura
                            </Typography>
                            <Typography variant="subtitle1" textAlign="left"  color="text.secondary">
                            Acelere o desenvolvimento com estrutura baseada na Clean Architecture
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Scripts de criação de tabelas correspondente a entidade</Box>
                            </Typography>

                            <Typography paragraph sx={{ textIndent: '0.5em' }} align="left">
                              {bull}<Box style={{ fontWeight: 'bold', display: 'inline' }}>Comandos de persistência da entidade</Box>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {navigate('getting-started/generator')}}>Saiba mais</Button>
                        </CardActions>
                      </Card>
                  </Box>

                  <Button
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}
                    onClick={ () => {navigate('/getting-started/generator')}}
                    sx={{
                      textTransform: 'none'
                    }}>
                    Explore o framework
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    onClick={() => {
                      openInNewTab('https://github.com/basepointweb/BasePointGenerator');
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
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Home
