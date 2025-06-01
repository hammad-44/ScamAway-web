import React, { useState, useEffect, useCallback } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Trash2, Eye, PlusCircle, XCircle } from "lucide-react";

import { db } from "@/firebase"; 
import { collection, onSnapshot, doc, deleteDoc, addDoc, Timestamp } from 'firebase/firestore';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface ScannedReportData { 
  requested_url: string;
  domain_name: string;
  riskScore: number;
  technologies?: any;
  detected_payment_methods_keywords?: any[];
  favicon_url?: string;
  specific_page_types_found?: any;
  crawled_pages_details?: any;
}

interface ScannedReport {
  id: string;
  timestamp: string; 
  data: ScannedReportData; 
}

interface ContactMessage {
  id: string; 
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

interface ScamReport {
  id: string; 
  reportType: string;
  entityValue: string;
  scamCategory: string;
  reporterName: string;
  reporterEmail: string;
  moneyLost: boolean;
  amount?: string | null;
  description: string;
  timestamp: string;
  contactMethod?: string;
  scammerOffer?: string;
  suspiciousDetails?: string;
  reportedBy?: string; 
}

type ActiveTab = 'scanned_reports' | 'contact_messages' | 'scam_reports';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('scanned_reports');
  const [scannedReports, setScannedReports] = useState<ScannedReport[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [scamReports, setScamReports] = useState<ScamReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [currentJsonData, setCurrentJsonData] = useState<{ data: any, collection: string } | null>(null);

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (!db) {
      setError("Firestore database not initialized. Please check Firebase configuration.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let unsubscribeScanned: () => void;
    let unsubscribeContact: () => void;
    let unsubscribeScam: () => void;

    try {
      unsubscribeScanned = onSnapshot(collection(db, "reports"), (snapshot) => {
        const reports: ScannedReport[] = [];
        snapshot.forEach((doc) => {
          const docData = doc.data();
          reports.push({
            id: doc.id,
            timestamp: docData.timestamp instanceof Timestamp
                       ? docData.timestamp.toDate().toISOString()
                       : (typeof docData.timestamp === 'string' ? docData.timestamp : new Date().toISOString()),
            data: docData.data as ScannedReportData 
          });
        });
        setScannedReports(reports);
        setLoading(false);
      }, (err) => {
        console.error("Error fetching scanned reports:", err);
        setError("Failed to load scanned reports.");
        setLoading(false);
      });

      unsubscribeContact = onSnapshot(collection(db, "contact_messages"), (snapshot) => {
        const messages: ContactMessage[] = [];
        snapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() } as ContactMessage);
        });
        setContactMessages(messages);
        setLoading(false);
      }, (err) => {
        console.error("Error fetching contact messages:", err);
        setError("Failed to load contact messages.");
        setLoading(false);
      });

      unsubscribeScam = onSnapshot(collection(db, "reported_scams"), (snapshot) => {
        const scams: ScamReport[] = [];
        snapshot.forEach((doc) => {
          scams.push({ id: doc.id, ...doc.data() } as ScamReport);
        });
        setScamReports(scams);
        setLoading(false);
      }, (err) => {
        console.error("Error fetching scam reports:", err);
        setError("Failed to load scam reports.");
        setLoading(false);
      });

    } catch (err: any) {
      setError(`Failed to set up real-time listeners: ${err.message}`);
      setLoading(false);
    }

    return () => {
      unsubscribeScanned && unsubscribeScanned();
      unsubscribeContact && unsubscribeContact();
      unsubscribeScam && unsubscribeScam();
    };
  }, [db]);

  const handleViewJson = useCallback((data: any, collectionName: string) => {
    setCurrentJsonData({ data: data, collection: collectionName });
    setJsonModalOpen(true);
  }, []);

  const handleDownloadJson = useCallback(() => {
    if (currentJsonData && currentJsonData.collection === 'reports' && currentJsonData.data.id) {
      const jsonString = JSON.stringify(currentJsonData.data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `${currentJsonData.data.id.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_result.json`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      setMessage({ type: 'error', text: 'No valid scanned report data to download.' });
    }
  }, [currentJsonData]);


  const handleDelete = useCallback(async (collectionName: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this item from ${collectionName}?`)) {
      return;
    }
    setLoading(true);
    try {
      await deleteDoc(doc(db, collectionName, id));
      setMessage({ type: 'success', text: 'Item deleted successfully!' });
    } catch (err: any) {
      console.error("Error deleting document:", err);
      setMessage({ type: 'error', text: `Failed to delete item: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }, [db]);




  const renderTableContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={activeTab === 'scanned_reports' ? 5 : 6} className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
            <p className="mt-2 text-gray-600">Loading data...</p>
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={activeTab === 'scanned_reports' ? 5 : 6} className="text-center py-8 text-red-600">
            <XCircle className="h-8 w-8 mx-auto mb-2" />
            <p>{error}</p>
          </TableCell>
        </TableRow>
      );
    }

    if (activeTab === 'scanned_reports') {
      return scannedReports.length > 0 ? (
        scannedReports.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-medium">{report.data.requested_url}</TableCell>
            <TableCell>{report.data.domain_name}</TableCell>
            <TableCell>{report.data.riskScore !== undefined ? report.data.riskScore : 'N/A'}</TableCell>
            <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => handleViewJson(report.data, 'reports')}>
                <Eye className="h-4 w-4" />
              </Button>
              {/* Removed Edit button */}
              {/* <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(report, 'reports')}>
                <Edit className="h-4 w-4" />
              </Button> */}
              <Button variant="destructive" size="sm" onClick={() => handleDelete('reports', report.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-4 text-gray-500">No scanned reports found.</TableCell>
        </TableRow>
      );
    } else if (activeTab === 'contact_messages') {
      return contactMessages.length > 0 ? (
        contactMessages.map((message) => (
          <TableRow key={message.id}>
            <TableCell className="font-medium">{message.name}</TableCell>
            <TableCell>{message.email}</TableCell>
            <TableCell>{message.subject}</TableCell>
            <TableCell className="max-w-[200px] truncate">{message.message}</TableCell>
            <TableCell>{new Date(message.timestamp).toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => handleViewJson(message, 'contact_messages')}>
                <Eye className="h-4 w-4" />
              </Button>
              {/* Removed Edit button */}
              {/* <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(message, 'contact_messages')}>
                <Edit className="h-4 w-4" />
              </Button> */}
              <Button variant="destructive" size="sm" onClick={() => handleDelete('contact_messages', message.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="text-center py-4 text-gray-500">No contact messages found.</TableCell>
        </TableRow>
      );
    } else if (activeTab === 'scam_reports') {
      return scamReports.length > 0 ? (
        scamReports.map((scam) => (
          <TableRow key={scam.id}>
            <TableCell className="font-medium">{scam.entityValue}</TableCell>
            <TableCell>{scam.reportType}</TableCell>
            <TableCell>{scam.scamCategory}</TableCell>
            <TableCell>{scam.reporterEmail}</TableCell>
            <TableCell>{scam.moneyLost ? 'Yes' : 'No'}</TableCell>
            <TableCell>{new Date(scam.timestamp).toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => handleViewJson(scam, 'reported_scams')}>
                <Eye className="h-4 w-4" />
              </Button>
              {/* Removed Edit button */}
              {/* <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(scam, 'reported_scams')}>
                <Edit className="h-4 w-4" />
              </Button> */}
              <Button variant="destructive" size="sm" onClick={() => handleDelete('reported_scams', scam.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-4 text-gray-500">No scam reports found.</TableCell>
        </TableRow>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Admin Dashboard"
          description="Manage website scan reports, contact messages, and user-submitted scam reports."
        />

        <div className="container mx-auto px-4 py-8">
          {message && (
            <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <AlertTitle>{message.type === 'success' ? 'Success!' : 'Error!'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-4 mb-6">
            <Button
              variant={activeTab === 'scanned_reports' ? 'default' : 'outline'}
              onClick={() => setActiveTab('scanned_reports')}
            >
              Scanned Website Reports
            </Button>
            <Button
              variant={activeTab === 'contact_messages' ? 'default' : 'outline'}
              onClick={() => setActiveTab('contact_messages')}
            >
              Contact Messages
            </Button>
            <Button
              variant={activeTab === 'scam_reports' ? 'default' : 'outline'}
              onClick={() => setActiveTab('scam_reports')}
            >
              User Scam Reports
            </Button>
           
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'scanned_reports' && 'Scanned Website Reports'}
                {activeTab === 'contact_messages' && 'Contact Messages'}
                {activeTab === 'scam_reports' && 'User Scam Reports'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {activeTab === 'scanned_reports' && (
                        <>
                          <TableHead>URL</TableHead>
                          <TableHead>Domain</TableHead>
                          <TableHead>Risk Score</TableHead>
                          <TableHead>Scanned At</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </>
                      )}
                      {activeTab === 'contact_messages' && (
                        <>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Received At</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </>
                      )}
                      {activeTab === 'scam_reports' && (
                        <>
                          <TableHead>Entity Value</TableHead>
                          <TableHead>Report Type</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Reporter Email</TableHead>
                          <TableHead>Money Lost</TableHead>
                          <TableHead>Reported At</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renderTableContent()}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* JSON Viewer Modal */}
      <Dialog open={jsonModalOpen} onOpenChange={setJsonModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Raw JSON Data</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-auto p-4 bg-gray-100 rounded-md">
            {/* Display currentJsonData.data as that holds the actual JSON content */}
            <pre className="text-sm whitespace-pre-wrap break-words">{JSON.stringify(currentJsonData?.data, null, 2)}</pre>
          </div>
          <DialogFooter>
            {/* Conditionally render Download JSON button only for 'reports' collection */}
            {currentJsonData?.collection === 'reports' && (
              <Button onClick={handleDownloadJson} className="mr-2">Download JSON</Button>
            )}
            <Button onClick={() => setJsonModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminPage;
