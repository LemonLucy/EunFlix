import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Image, Text, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const MovieModal = ({ movie, isOpen, onClose }) => (
  <Modal isCentered onClose={onClose} isOpen={isOpen} size="lg" motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent
      borderRadius="md"
      overflowY="auto" // Enable vertical scrolling
      maxHeight="80vh" // Limit modal height to make scrolling possible
    >
      <ModalHeader color="white">{movie?.title}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        {/* Full Movie Image */}
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
};

export default MovieModal;
