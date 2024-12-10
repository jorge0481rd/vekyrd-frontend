import { Box } from '@mui/material'
import Navbar from './navbar'
import Footer from './Footer'
import PropTypes from 'prop-types'

const PageContainer = ({ children }) => {
	return (
		<Box sx={{ width: '100%', minHeight: '100vh', padding: 4, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch' }}>
			<Navbar />
			<Box sx={{ flex: 1, height: '100%', marginTop: '50px' }}>
				{children}
			</Box>
			<Footer />
		</Box>
	)
}

PageContainer.propTypes = {
	children: PropTypes.node.isRequired,
}

export default PageContainer