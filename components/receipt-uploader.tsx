import { Form } from '@/components';
import ImageSelector from '@components/image-selector';
import { loadAllReceipts, ReceiptMeta, saveReceiptLocally } from '@services/local-receipt';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import { FormStateContext } from 'src/context/FormContext';
// import { PurchaseLogData } from '@db/purchase-logs/types';

export const ReceiptUploader = ({ docsService }: { docsService: any }) => {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  
  // Load existing receipts on mount
  React.useEffect(() => {
    loadAllReceipts().then(setReceipts);
  }, []);

  const handleSave = async () => {
    if (!previewUri) return;

    try {
      const meta = await saveReceiptLocally(previewUri);
      setReceipts(prev => [...prev, meta]);
      setPreviewUri(null);
      Alert.alert('Success', 'Receipt saved locally.');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not save receipt.');
    }
  };

  const renderItem = ({ item }: { item: ReceiptMeta }) => (
    <View style={styles.item}>
      <Image source={{ uri: `file://${item.filePath}` }} style={styles.thumb} />
      <Text>{item.name}</Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Pick & preview */}
      <Form.Label
        label='Select Image'
        name='imageContainer'
      >
        <ImageSelector
          docsService={docsService}
        />
      </Form.Label>
      {/* List of saved receipts */}
      <View style={styles.list}>
        {receipts.map((item) => (
          <View key={item.id} style={styles.item}>
            <Image source={{ uri: `file://${item.filePath}` }} style={styles.thumb} />
            <Text>{item.name}</Text>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1},
  preview: { width: '100%',marginVertical: 12 },
  list: { marginTop: 24 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  thumb: { width: 60, height: 60, marginRight: 12, borderRadius: 4 },
  date: { fontSize: 10, color: '#666' },
});