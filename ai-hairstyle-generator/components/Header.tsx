import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LogoIcon } from './icons/LogoIcon';
import Svg, { Path } from 'react-native-svg';

const HeartIcon = () => (
    <Svg height="16" width="16" viewBox="0 0 20 20" fill="currentColor">
        <Path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </Svg>
);

const GeneratorIcon = () => (
    <Svg height="16" width="16" viewBox="0 0 20 20" fill="currentColor">
        <Path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 11a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </Svg>
);


export const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <LogoIcon height={40} width={40} />
          <View>
            <Text style={styles.title}>stylemy.hair</Text>
            <Text style={styles.subtitle}>Your Salon-Grade Virtual Try-On</Text>
          </View>
        </View>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <HeartIcon />
            <Text style={styles.activeTabText}>Virtual Mirror</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
            <GeneratorIcon />
            <Text style={styles.tabText}>AI Style Generator</Text>
        </TouchableOpacity>
      </View>
      {/* Informational tags can be added here if needed for mobile */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 8,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: '#0f172a',
    padding: 4,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#4f46e5',
  },
  tabText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
