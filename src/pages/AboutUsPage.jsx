import React from 'react';
import { Building, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';
import { useAbout } from '../hooks/useAPI';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AboutUsPage = () => {
  const { data: about, isLoading, isError } = useAbout();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ErrorMessage message="Failed to load about information. Please try again later." />
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ErrorMessage message="No about information available." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-muted-foreground">
              Discover who we are and what we do at Discount-Code UAE
            </p>
          </div>

          <div className="grid gap-8">
            {/* Company Information */}
            <div className="bg-card rounded-lg p-8 border">
              <div className="flex items-center space-x-3 mb-6">
                <Building className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">About Discount-Code</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">Our Story</h3>
                  <p className="text-lg">{about.our_story}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Company Name</h3>
                  <p className="text-lg">{about.company_name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Legal Form</h3>
                  <p className="text-lg">{about.legal_form}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Founded</h3>
                  <p className="text-lg">{about.founded_year}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-lg p-8 border">
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Get in Touch</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-muted-foreground" style={{ whiteSpace: 'pre-line' }}>
                        {about.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">{about.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">{about.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <p className="text-muted-foreground">{about.website}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="bg-card rounded-lg p-8 border">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">What We Do</h3>
                  <p className="text-lg">{about.mission}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Our Vision</h3>
                  <p className="text-lg">{about.vision}</p>
                </div>
              </div>
            </div>

            {/* Legal Note */}
            <div className="bg-card rounded-lg p-8 border">
              <h2 className="text-2xl font-semibold mb-6">Legal Note</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">Privacy & Compliance</h3>
                  <p className="text-muted-foreground">
                    {about.privacy_note}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Disclaimer</h3>
                  <p className="text-muted-foreground">
                    {about.disclaimer}
                  </p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center text-muted-foreground">
              <p>Last updated: {about.last_updated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
