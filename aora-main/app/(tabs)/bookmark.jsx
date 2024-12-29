import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { getReferenceRange } from '../../utils/loadData';

const HormoneAnalysis = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hormones, setHormones] = useState({
    IgA: '',
    IgM: '',
    IgG: '',
    IgG1: '',
    IgG2: '',
    IgG3: '',
    IgG4: ''
  });
  const [results, setResults] = useState([]);

  const calculateAgeInMonths = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    return ageInMonths;
  };

  const analyzeHormones = () => {
    const ageInMonths = calculateAgeInMonths(birthDate);
    const analysisResults = [];

    Object.keys(hormones).forEach((hormoneType) => {
      const value = parseFloat(hormones[hormoneType]);
      if (!isNaN(value)) {
        const range = getReferenceRange(ageInMonths, hormoneType);
        if (range) {
          if (value < range.min_val) {
            analysisResults.push({ hormone: hormoneType, value, status: 'Düşük' });
          } else if (value > range.max_val) {
            analysisResults.push({ hormone: hormoneType, value, status: 'Yüksek' });
          } else {
            analysisResults.push({ hormone: hormoneType, value, status: 'Normal' });
          }
        } else {
          analysisResults.push({ hormone: hormoneType, value, status: 'Yaş aralığına ait veri bulunamadı' });
        }
      }
    });

    setResults(analysisResults);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hormon Analizi</Text>

      <Text>Ad Soyad:</Text>
      <TextInput
        style={styles.input}
        placeholder="Adınızı girin"
        value={name}
        onChangeText={setName}
      />

      <Text>Cinsiyet:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cinsiyetinizi girin"
        value={gender}
        onChangeText={setGender}
      />

      <Text>Doğum Tarihi (YYYY-AA-GG):</Text>
      <TextInput
        style={styles.input}
        placeholder="Doğum tarihinizi girin"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      {Object.keys(hormones).map((hormone) => (
        <View key={hormone}>
          <Text>{hormone}:</Text>
          <TextInput
            style={styles.input}
            placeholder={`${hormone} değerini girin`}
            value={hormones[hormone]}
            onChangeText={(value) => setHormones({ ...hormones, [hormone]: value })}
            keyboardType="numeric"
          />
        </View>
      ))}

      <Button title="Analiz Et" onPress={analyzeHormones} />

      {results.length > 0 && (
        <View>
          <Text style={styles.resultsHeader}>Sonuçlar:</Text>
          {results.map((result, index) => (
            <Text key={index} style={styles.resultItem}>
              {result.hormone}: {result.value} - {result.status}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  resultItem: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default HormoneAnalysis;
