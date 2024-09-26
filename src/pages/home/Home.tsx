
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
import CodeMirror, { color } from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { codeEditorTheme } from '@shared/configs/constants/themes'
import TypingEffect from '@/components/TypingEffect/TypingEffect';

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

  const normalSx = {
    color: 'green', position: 'relative', fontSize: '70px',
    zIndex: 2
  }
  const basePointSx = {
    color: '#0096ff',
    position: 'relative',
    fontSize: '70px',
    zIndex: 2
  }

  const boxReferenceSamples = new Map([
    [entityRef.current, codeEntitySample],
    [repositoryRef.current, codeRepositorySample],
    [usecaseRef.current, codeUseCaseSample],
    [dapperCommandRef.current, codeDapperCommandSample]])

  const selectedFirstCodeSample = (): void => {
    if (entityRef.current != null) {
      boxReferences.forEach(boxReference => {
        boxReference.current.style.backgroundColor = (boxReference.current === entityRef.current) ? '#efffff' : 'white'
        boxReference.current.style.borderColor = (boxReference.current === entityRef.current) ? '#3b93ec' : 'white'
      });

      setSelectedCodeSample(codeEntitySample)
    }
  }

  const handleClassSampleClick = (event): void => {
    const clickedBox = event.currentTarget;

    boxReferences.forEach(boxReference => {
      boxReference.current.style.backgroundColor = (boxReference.current === clickedBox) ? '#efffff' : 'white'
      boxReference.current.style.borderColor = (boxReference.current === clickedBox) ? '#3b93ec' : 'white'
    });

    setSelectedCodeSample(boxReferenceSamples.get(clickedBox))
  }

  useEffect(() => {
    selectedFirstCodeSample()
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
          >
            <Box sx={{    
              background: 'whitesmoke',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid #e8eaee'
            }}>
              <Grid item xs={9}>
                <Box sx={{ marginBottom: '50px', marginTop: '60px' }}>
                  <Typography variant="h4" align='left' sx={{ color: '#0072ff', fontWeight: 'bold' }}>BasePoint Framework</Typography>
                  {/*#00c6ff,*/ }
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'row',
                      textAlign: 'left',
                      alignItems: 'center',
                      marginBottom: '50px',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        width: 'calc(100% - 40px)',
                        height: '25px',
                        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                        zIndex: 1,
                        transform: 'translateY(-50%)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 0,
                        width: '30px',
                        height: '25px',
                        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                        borderRadius: '0 18px 0px 0',
                      }}
                    />
                    <TypingEffect
                      prefixText="Desenvolva com"
                      texts={['qualidade', 'velocidade', 'BasePoint']}
                      textThemes={[normalSx, normalSx, normalSx]}
                      prefixSx={{ position: 'relative', zIndex: 2, fontSize: '70px' }}
                    />
                  </Box>

                  <Typography paragraph align='left' sx={{ fontSize: '27px' }}>
                    Ferramentas para criar aplicações robustas e modernas, permitindo que você foque no seu negócio.
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                      variant="contained"                    
                      onClick={() => { navigate('/getting-started') }}
                      sx={{
                       
                        height: 50,
                        fontSize: 18
                      }}
                    >
                      Impulsione seu desenvolvimento
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Box>

            <Box sx={{
              background: 'linear-gradient(to bottom, white, #ebf5ff)',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid #e8eaee'
            }}>
              <Grid item xs={9}>
                <Box sx={{ marginBottom: '50px' ,marginTop: '60px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px',
                    }}
                  >
                    <Box sx={{ minWidth: 500, width: '49%'}}>
                      <Typography variant="h4" textAlign="left" sx={{ marginBottom: '20px' }}>Diversas ferramentas para um <Box style={{ fontWeight: 'bold', display: 'inline', color: 'green' }}>back-end</Box> robusto</Typography>
                      
                      <Box
                        ref={entityRef}
                        onClick={handleClassSampleClick}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px',
                          borderRadius: '8px',
                          backgroundColor: 'theme.palette.background.paper',
                          border: '1px solid #3b93ec',
                          marginBottom: '10px',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          maxWidth: '400px', // ajuste conforme necessário
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#ebf5ff !important',
                            borderColor: '#3b93ec !important'
                          },
                        }}>
                        <YouTubeIcon sx={{ color: '#1976d2', marginRight: '8px' }} />
                        <Box>
                          <Typography variant="subtitle1" align='left' sx={{ fontWeight: 'bold' }}>
                            Diversas classes prontas para uso
                          </Typography>
                          <Typography variant="subtitle2">
                            Implemente com DDD e Arquitetura Limpa
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        ref={repositoryRef}
                        onClick={handleClassSampleClick}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px',
                          borderRadius: '8px',
                          width: '100%',
                          backgroundColor: 'theme.palette.background.paper',
                          border: '1px solid #3b93ec',
                          marginBottom: '10px',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          maxWidth: '400px', // ajuste conforme necessário
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#ebf5ff !important',
                            borderColor: '#3b93ec !important'
                          },
                        }}>
                        <YouTubeIcon sx={{ color: '#1976d2', marginRight: '8px' }} />
                        <Box>
                          <Typography variant="subtitle1" align='left' sx={{ fontWeight: 'bold' }}>
                            Liberdade para escolher a sua infra
                          </Typography>
                          <Typography variant="subtitle2">
                            Implemente na tecnologia de sua escolha
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        ref={dapperCommandRef}
                        onClick={handleClassSampleClick}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px',
                          borderRadius: '8px',
                          backgroundColor: 'theme.palette.background.paper',
                          border: '1px solid #3b93ec',
                          marginBottom: '10px',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          maxWidth: '400px', // ajuste conforme necessário
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#ebf5ff !important',
                            borderColor: '#3b93ec !important'
                          },
                        }}>
                        <YouTubeIcon sx={{ color: '#1976d2', marginRight: '8px' }} />
                        <Box>
                          <Typography variant="subtitle1" align='left' sx={{ fontWeight: 'bold' }}>
                            Templates e geração de boilerplate 
                          </Typography>
                          <Typography variant="subtitle2">
                            Gera toda a estrutura e foqueno mais importante
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        ref={usecaseRef}
                        onClick={handleClassSampleClick}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px',
                          borderRadius: '8px',
                          backgroundColor: 'theme.palette.background.paper',
                          border: '1px solid #3b93ec',
                          marginBottom: '10px',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          maxWidth: '400px', // ajuste conforme necessário
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#ebf5ff !important',
                            borderColor: '#3b93ec !important'
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

                    <Box sx={{ minWidth: 500, width: '100%', height: '100%' }}>
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
                        style={{ width: '100%', height: '100%', overflow: 'auto', zIndex: -1, textAlign: 'left' }}
                        readOnly
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Box>

            <Box sx={{
              background: 'whitesmoke',         
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid #e8eaee'
            }}>
              <Grid item xs={9}>
                <Box sx={{ marginBottom: '50px', marginTop: '60px' }}>
                <Typography variant="h4">Framework Open source</Typography>
                  <Typography paragraph align='left'>
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
                    <Card sx={{ minWidth: 500, width: '49%' }}>
                      <CardContent>
                        <Typography variant="h6" textAlign="left">
                          Arquitetura
                        </Typography>
                        <Typography variant="subtitle1" textAlign="left" color="text.secondary">
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
                        <Button size="small" onClick={() => { openInNewTab('https://www.nuget.org/packages/Best.Practices.Core/') }}>Saiba mais</Button>
                      </CardActions>
                    </Card>

                    <Card sx={{ minWidth: 500, width: '49%' }}>
                      <CardContent>
                        <Typography variant="h6" textAlign="left">
                          Infraestrutura
                        </Typography>
                        <Typography variant="subtitle1" textAlign="left" color="text.secondary">
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
                        <Button size="small" onClick={() => { openInNewTab('https://www.nuget.org/packages/Best.Practices.Core/') }}>Saiba mais</Button>
                      </CardActions>
                    </Card>
                  </Box>
                  <Button
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}
                    onClick={() => { navigate('/getting-started') }}
                    sx={{
                      textTransform: 'none'
                    }}>
                    Explore o framework
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Home
