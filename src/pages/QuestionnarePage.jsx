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
import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import { postQuestionnaire } from '../helpers/questionnare';
import ProductCardHorizontal from '../components/ProductCard/ProductCardHorizontal';
import randomlyFormatParagraph from '../helpers/randomlyFormatParragraph';

const QuestionnairePage = () => {
  const [hideRecommendations, setHideRecommendations] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questionnaireCounter, setQuestionnaireCounter] = useState(0);

  const [hairType, setHairType] = useState('rizado');
  const [hairLength, setHairLength] = useState('largo');
  const [scalpCondition, setScalpCondition] = useState('saludable');
  const [currentIssues, setCurrentIssues] = useState('resequedad por el calor');
  const [goals, setGoals] = useState('quiero un spray para cuidarlo del calor');

  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      name: 'Shampoo hidratante',
      description: 'Shampoo para cabellos secos',
      price: '10.99',
      stock: 20,
      imageurl: '/img/products/shampoo1.jpg',
      sku: 'SKUc20dfe',
      description_large:
        'Este shampoo hidratante está especialmente diseñado para restaurar la hidratación del cabello seco, dañado o deshidratado. Gracias a su fórmula avanzada, rica en ingredientes naturales como aceites esenciales, proteínas y extractos de plantas, proporciona una hidratación profunda y duradera desde la raíz hasta las puntas. Su acción nutritiva ayuda a suavizar la fibra capilar, reparando el daño y mejorando la textura del cabello, dejándolo más suave, brillante y manejable. Ideal para todo tipo de cabellos, especialmente aquellos que sufren de resequedad debido a factores ambientales, el uso excesivo de productos de styling o la exposición al sol y al agua salada. Al usarlo de manera regular, no solo notarás un cabello más hidratado, sino también fortalecido, con un aspecto saludable y radiante. Este shampoo es perfecto para quienes buscan una solución eficaz para combatir la falta de humedad y restaurar el equilibrio natural de su cabello. ',
      average_rating: '3.00',
      recommendation:
        'El uso de un buen protector térmico es fundamental si tienes el cabello rizado y largo. El Shampoo hidratante no solo protege tu cabello del daño causado por el calor de las herramientas de peinado, sino que también ayuda a mantener la hidratación, lo cual es esencial para combatir la resequedad provocada por el calor.',
    },
    {
      id: 2,
      name: 'Shampoo para cabellos grasos',
      description: 'Shampoo para cabellos con exceso de grasa',
      price: '11.49',
      stock: 7,
      imageurl: '/img/products/shampoo2.jpg',
      sku: 'SKU6099de',
      description_large:
        'Este shampoo hidratante está especialmente diseñado para restaurar la hidratación del cabello seco, dañado o deshidratado. Gracias a su fórmula avanzada, rica en ingredientes naturales como aceites esenciales, proteínas y extractos de plantas, proporciona una hidratación profunda y duradera desde la raíz hasta las puntas. Su acción nutritiva ayuda a suavizar la fibra capilar, reparando el daño y mejorando la textura del cabello, dejándolo más suave, brillante y manejable. Ideal para todo tipo de cabellos, especialmente aquellos que sufren de resequedad debido a factores ambientales, el uso excesivo de productos de styling o la exposición al sol y al agua salada. Al usarlo de manera regular, no solo notarás un cabello más hidratado, sino también fortalecido, con un aspecto saludable y radiante. Este shampoo es perfecto para quienes buscan una solución eficaz para combatir la falta de humedad y restaurar el equilibrio natural de su cabello. ',
      average_rating: '3.00',
      recommendation:
        'Mantener la salud de tu cabello rizado es una tarea que requiere de productos específicos. El Shampoo para cabellos grasos está diseñado para proporcionar una barrera contra los daños del calor y además hidratar tu melena, asegurando que luzca brillante y saludable.',
    },
    {
      id: 4,
      name: 'Spray protector térmico',
      description: 'Protege el cabello del daño del calor',
      price: '12.99',
      stock: 5,
      imageurl: '/img/products/spray1.jpg',
      sku: 'SKUf57d61',
      description_large:
        'Este shampoo hidratante está especialmente diseñado para restaurar la hidratación del cabello seco, dañado o deshidratado. Gracias a su fórmula avanzada, rica en ingredientes naturales como aceites esenciales, proteínas y extractos de plantas, proporciona una hidratación profunda y duradera desde la raíz hasta las puntas. Su acción nutritiva ayuda a suavizar la fibra capilar, reparando el daño y mejorando la textura del cabello, dejándolo más suave, brillante y manejable. Ideal para todo tipo de cabellos, especialmente aquellos que sufren de resequedad debido a factores ambientales, el uso excesivo de productos de styling o la exposición al sol y al agua salada. Al usarlo de manera regular, no solo notarás un cabello más hidratado, sino también fortalecido, con un aspecto saludable y radiante. Este shampoo es perfecto para quienes buscan una solución eficaz para combatir la falta de humedad y restaurar el equilibrio natural de su cabello. ',
      average_rating: '5.00',
      recommendation:
        'La elección de un buen spray protector es clave para cuidar tu cabello rizado y evitar la resequedad. El Spray protector térmico no solo ofrece protección termal, sino que también trabaja para mantener la suavidad y la definición de tus rizos, haciéndolos más manejables.',
    },
  ]);
  const [generalTips, setGeneralTips] = useState(
    '<div>\n    <h2>Recomendaciones para el cuidado del cabello</h2>\n    <ul>\n        <li>\n            <strong>Para cabellos secos:</strong> Utiliza un shampoo hidratante que nutra y restaure la hidratación natural del cabello.\n        </li>\n        <li>\n            <strong>Para cabellos con exceso de grasa:</strong> Elige un shampoo purificante que controle la producción de grasa y limpie profundamente el cuero cabelludo.\n        </li>\n        <li>\n            <strong>Protección contra el daño del calor:</strong> Aplica un shampoo que contenga ingredientes protectores para minimizar el daño causado por herramientas de calor.\n        </li>\n    </ul>\n</div>\n'
  );
  const [generalTipsUrlList, setGeneralTipsUrlList] = useState([
    '/img/happy-woman1.jpg',
    '/img/happy-woman2.jpg',
    '/img/happy-woman3.jpg',
    '/img/happy-woman4.jpg',
  ]);
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
      setQuestionnaireCounter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // getRandomImage();
  }, [questionnaireCounter]);

  const getRandomImage = () => {
    const urls = generalTipsUrlList;
    const randomIndex = Math.floor(Math.random() * urls.length);
    setGeneralTipsImageUrl(urls[randomIndex]);

    const updatedUrls = urls.filter((url) => url !== urls[randomIndex]);
    setGeneralTipsUrlList(updatedUrls);
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
