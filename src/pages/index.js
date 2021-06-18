import Header from '../components/header';
import GalleryGrid from '../components/gallerygrid';

export default function Home() {
  return (
    <div className="content">
      <Header title='galleries' />
      <GalleryGrid />
    </div>
  )
}
