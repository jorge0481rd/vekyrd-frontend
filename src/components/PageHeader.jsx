import { Box, CircularProgress, Typography } from '@mui/material'
import LoadingIndicator from './LoadingIndicator'

const PageHeader = ({ text, children, isLoading = false }) => {
	return (
		<Box id='page-header' sx={{
			width: '100%',
			margin: "2rem 0",
			position: 'relative',
		}}>
			{isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%', transform: 'translateY(50px)' }}><CircularProgress /></Box>}
			<Typography variant="h4" textAlign={'center'} m={1}>{text}</Typography>
			<>{children}</>
		</Box>
	)
}

PageHeader.propTypes = {
	text: String,
	children: React.ReactNode,
	isLoading: Boolean,
}

export default PageHeader