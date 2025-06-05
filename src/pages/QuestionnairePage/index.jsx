import {
	Box,
	Button,
	CircularProgress,
	Paper,
	Typography
} from '@mui/material';
import { useState } from 'react';
import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';
import ProductCardHorizontal from '../../components/ProductCard/ProductCardHorizontal';
import NavigationButton from '../../components/navigation-button';
import randomlyFormatParagraph from '../../helpers/randomlyFormatParragraph';
import FormRadioButtons from './FormRadioButtons';
import FormTextFields from './FormTextFields';
import { apiPostQuestionnaire } from '../../api/api';

const QuestionnairePage = () => {
	const [hideRecommendations, setHideRecommendations] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const [hairType, setHairType] = useState('rizado');
	const [hairLength, setHairLength] = useState('largo');
	const [dyeHairFrequency, setDyeHairFrequency] = useState('Sí, frecuentemente');
	const [mainConcern, setMainConcern] = useState('Caída excesiva');
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

	const getRandomImage = () => {
		const urls = generalTipsUrlList;
		const randomIndex = Math.floor(Math.random() * urls.length);
		setGeneralTipsImageUrl(urls[randomIndex]);
	};

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

			//api call
			const { recommendations, generalTips } = await apiPostQuestionnaire(
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

	return (
		<PageContainer>
			<PageHeader
				title="Asistente con Inteligencia Artificial de Belleza"
				subtitle="¡Nuestro sistema inteligente analizará tu cabello para recomendaciones personalizadas!"
			>
				<NavigationButton href="/home" text="Inicio ►" />
			</PageHeader>

			<FormRadioButtons
				hairType={hairType}
				setHairType={setHairType}
				hairLength={hairLength}
				setHairLength={setHairLength}
				dyeHairFrequency={dyeHairFrequency}
				setDyeHairFrequency={setDyeHairFrequency}
				mainConcern={mainConcern}
				setMainConcern={setMainConcern}
			/>

			<FormTextFields
				scalpCondition={scalpCondition}
				setScalpCondition={setScalpCondition}
				currentIssues={currentIssues}
				setCurrentIssues={setCurrentIssues}
				goals={goals}
				setGoals={setGoals}
			/>

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
					boxSizing: 'border-box',
					flexWrap: { xs: 'wrap', md: 'nowrap' },
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
							boxSizing: 'border-box',
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
								style={{ maxWidth: '375px', height: 'auto' }}
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
								maxWidth: '400px',
								padding: 2,
								boxSizing: 'border-box',
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
