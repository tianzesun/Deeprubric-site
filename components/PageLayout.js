import Head from 'next/head';
import SkipLink from './SkipLink';

/**
 * Page Layout Component
 * This component provides a consistent layout structure for all pages
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.mainId - ID for the main content section
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.keywords - Additional keywords for SEO
 */
export default function PageLayout({
  children,
  title = 'GradeGenius - AI-Powered Grading Platform',
  description = 'Transform your grading workflow with AI-powered intelligent rubric generation and automated feedback assistance.',
  mainId = 'main-content',
  ogImage = '/og-image.png',
  canonicalUrl = 'https://gradegenius-web.netlify.app',
  keywords = ''
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="GradeGenius" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Additional keywords if provided */}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>

      <SkipLink href={`#${mainId}`} />

      <div className="min-h-screen flex flex-col">
        <main id={mainId} className="flex-grow">
          {children}
        </main>
      </div>
    </>
  );
}
