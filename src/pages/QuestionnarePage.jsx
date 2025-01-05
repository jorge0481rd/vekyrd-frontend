import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import { postQuestionnaire } from '../helpers/questionnare';
import ProductCardHorizontal from '../components/ProductCard/ProductCardHorizontal';
import randomlyFormatParagraph from '../helpers/randomlyFormatParragraph';

const QuestionnairePage = () => {
  const [hideRecommendations, setHideRecommendations] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [hairType, setHairType] = useState('rizado');
  const [hairLength, setHairLength] = useState('largo');
  const [scalpCondition, setScalpCondition] = useState('saludable');
  const [currentIssues, setCurrentIssues] = useState('resequedad por el calor');
  const [goals, setGoals] = useState('quiero un spray para cuidarlo del calor');

  const [recommendations, setRecommendations] = useState([]);
  const [generalTips, setGeneralTips] = useState('');

  const generalTipsUrlList = [
    '/img/happy-woman1.jpg',
    '/img/happy-woman2.jpg',
    '/img/happy-woman3.jpg',
    '/img/happy-woman4.jpg',
    '/img/happy-woman5.jpg',
    '/img/happy-woman6.jpg',
    '/img/happy-woman7.jpg',
    '/img/happy-woman8.jpg',
  ];
  const [generalTipsImageUrl, setGeneralTipsImageUrl] = useState(null);

  const handleSubmit = async () => {
    setHideRecommendations(true);
    setIsLoading(true);

    const thisButton = document.getElementById('send-button');
    thisButton.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    try {
      const questionResponses = {
        hairType,
        hairLength,
        scalpCondition,
        currentIssues,
        goals,
      };

      // api call
      const { recommendations, generalTips } = await postQuestionnaire(
        questionResponses
      );
      setRecommendations(recommendations);
      setGeneralTips(generalTips);
      getRandomImage();
    } catch (error) {
      console.error('Error enviando respuestas:', error);
    } finally {
      setHideRecommendations(false);
      setIsLoading(false);
    }
  };

  const getRandomImage = () => {
    const urls = generalTipsUrlList;
    const randomIndex = Math.floor(Math.random() * urls.length);
    setGeneralTipsImageUrl(urls[randomIndex]);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Cuestionario de Productos"
        subtitle="¡Queremos conocer tu cabello para recomendarte lo mejor!"
      >
        <NavigationButton href="/home" text="Inicio ►" />
      </PageHeader>

      <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
        {/* Tipo de cabello */}
        <Typography variant="h6">
          1. ¿Cómo describirías tu tipo de cabello?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={hairType}
            onChange={(e) => setHairType(e.target.value)}
          >
            <FormControlLabel value="liso" control={<Radio />} label="Liso" />
            <FormControlLabel
              value="ondulado"
              control={<Radio />}
              label="Ondulado"
            />
            <FormControlLabel
              value="rizado"
              control={<Radio />}
              label="Rizado"
            />
            <FormControlLabel
              value="muyRizado"
              control={<Radio />}
              label="Muy rizado"
            />
          </RadioGroup>
        </FormControl>

        {/* Longitud del cabello */}
        <Typography variant="h6" sx={{ marginTop: '1rem' }}>
          2. ¿Qué tan largo es tu cabello?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={hairLength}
            onChange={(e) => setHairLength(e.target.value)}
          >
            <FormControlLabel value="corto" control={<Radio />} label="Corto" />
            <FormControlLabel value="medio" control={<Radio />} label="Medio" />
            <FormControlLabel value="largo" control={<Radio />} label="Largo" />
          </RadioGroup>
        </FormControl>

        {/* Condición del cuero cabelludo */}
        <Typography variant="h6" sx={{ marginTop: '1rem' }}>
          3. ¿Cuál es la condición de tu cuero cabelludo?
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Describe tu cuero cabelludo (ej. seco, graso, sensible...)"
          value={scalpCondition}
          sx={{ background: 'white' }}
          onChange={(e) => setScalpCondition(e.target.value)}
        />

        {/* Problemas actuales */}
        <Typography variant="h6" sx={{ marginTop: '1rem' }}>
          4. ¿Qué problemas específicos tiene tu cabello?
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ej. caída excesiva, frizz, daño químico..."
          value={currentIssues}
          sx={{ background: 'white' }}
          onChange={(e) => setCurrentIssues(e.target.value)}
        />

        {/* Objetivos */}
        <Typography variant="h6" sx={{ marginTop: '1rem' }}>
          5. ¿Qué resultados esperas conseguir?
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ej. más hidratación, volumen, reparación..."
          value={goals}
          sx={{ background: 'white' }}
          onChange={(e) => setGoals(e.target.value)}
        />

        {/* Botón de envío */}
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button
            id="send-button"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Enviar Respuestas
          </Button>
        </Box>
      </Box>

      <Box
        sx={{ margin: 2, width: '100%', borderTop: 'dashed 3px #ccc' }}
      ></Box>

      <Typography
        variant="h6"
        sx={{
          margin: 1,
          textAlign: 'center',
          transition: 'all 300ms ease-in-out',
          opacity: isLoading ? 1 : 0,
          transform: `translateY(${isLoading ? 100 : -300}px)`,
        }}
      >
        Buscando resultados ...
        <CircularProgress />
      </Typography>

      <Box
        id="questionaire-ai-response"
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Paper
            sx={{
              padding: '4px',
              margin: '0 auto',
              transition: 'all 700ms ease-in-out',
              opacity: hideRecommendations ? 0 : 1,
              transform: `translateX(${hideRecommendations ? -100 : 0}px)`,
            }}
          >
            {generalTipsImageUrl && (
              <img
                src={generalTipsImageUrl}
                alt="happy woman"
                width="auto"
                height="300px"
              />
            )}
          </Paper>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: generalTips,
            }}
            sx={{
              margin: 1,
              textAlign: 'left',
              transition: 'all 300ms ease-in-out',
              opacity: hideRecommendations ? 0 : 1,
              transform: `translateY(${hideRecommendations ? 100 : 0}px)`,
            }}
          ></Typography>
        </Box>
        <Box>
          {recommendations.map((product, index) => (
            <Box
              className="recommended-product-card"
              key={`${product.name}-${product.id}`}
              sx={{
                display: 'flex',
                gap: 1,
                flexDirection: 'column',
                width: '400px',
                padding: 2,
                transition: `all ${(index + 4) * 2 * 100}ms ease-in-out`,
                opacity: hideRecommendations ? 0 : 1,
                transform: `translateX(${hideRecommendations ? 100 : 0}px)`,
              }}
            >
              <ProductCardHorizontal
                product={product}
                isProductInCart={false}
                disableLinkToDetails
              />

              <Typography
                variant="subtitle1"
                sx={{ margin: 1, textAlign: 'center', fontSize: '0.8rem' }}
                dangerouslySetInnerHTML={{
                  __html: randomlyFormatParagraph(product.recommendation),
                }}
              ></Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default QuestionnairePage;
