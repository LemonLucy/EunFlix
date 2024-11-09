import { Modal, Box,ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Image, Text, Stack, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';

const MovieModal = ({ movie, isOpen, onClose, isLiked, toggleWishlist }) => (

  <Modal isCentered onClose={onClose} isOpen={isOpen} size="lg" motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent
      borderRadius="md"
      overflowY="auto" // Enable vertical scrolling
      maxHeight="80vh" // Limit modal height to make scrolling possible
      bg="gray.800"
    >
      <ModalHeader color="white" display="flex" alignItems="center" justifyContent="space-between">
        {movie?.title}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Heart Icon for Wishlist Toggle */}
          <IconButton
            icon={<AiFillHeart />}
            size="lg"
            colorScheme={isLiked ? 'red' : 'gray'}
            onClick={() => toggleWishlist(movie)}
            aria-label="Add to wishlist"
            variant="ghost"
          />
          <ModalCloseButton position="relative" top="2px"/>
        </Box>
      </ModalHeader>

      <ModalBody>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            width="100%"
            borderRadius="md"
            mb={4}
          />

        {/* Movie Details */}
          <Stack spacing={4} color="white">
            <Text fontWeight="bold" fontSize="lg">Overview:</Text>
            <Text>{movie?.overview || 'No overview available.'}</Text>

            <Text fontWeight="bold" fontSize="lg">Release Date:</Text>
            <Text>{movie?.release_date || 'N/A'}</Text>

            <Text fontWeight="bold" fontSize="lg">Rating:</Text>
            <Text>{movie?.vote_average || 'N/A'}</Text>
          </Stack>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" onClick={onClose} mr={3}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

MovieModal.propTypes = {
  movie: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLiked: PropTypes.bool, // Determines if the movie is in the wishlist
  toggleWishlist: PropTypes.func.isRequired, // Function to toggle wishlist
};

export default MovieModal;
