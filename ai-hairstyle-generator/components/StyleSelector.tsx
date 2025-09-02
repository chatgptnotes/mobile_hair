import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import type { Hairstyle } from '../types';
import { StylesIcon } from './icons/StylesIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ResetIcon } from './icons/ResetIcon';

interface StyleSelectorProps {
  styles: Hairstyle[];
  selectedStyle: Hairstyle | null;
  onStyleSelect: (style: Hairstyle) => void;
  onReset: () => void;
}

const FILTERS = ['All', 'Short', 'Long', 'Modern'];

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles: hairstyleStyles, selectedStyle, onStyleSelect, onReset }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredStyles = useMemo(() => {
        return hairstyleStyles.filter(style => {
            const matchesFilter = activeFilter === 'All' || style.categories.includes(activeFilter.toLowerCase());
            const matchesSearch = style.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [hairstyleStyles, searchTerm, activeFilter]);

    const renderStyleItem = ({ item }: { item: Hairstyle }) => (
        <TouchableOpacity
            style={[componentStyles.styleItem, selectedStyle?.id === item.id && componentStyles.selectedStyleItem]}
            onPress={() => onStyleSelect(item)}
        >
            <Image source={{ uri: item.imageUrl }} style={componentStyles.styleImage} />
            <View style={componentStyles.styleNameContainer}>
                <Text style={componentStyles.styleName} numberOfLines={1}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

  return (
    <View style={componentStyles.container}>
        <View style={componentStyles.header}>
            <StylesIcon />
            <Text style={componentStyles.title}>Preset Styles</Text>
        </View>

        <View style={componentStyles.searchContainer}>
            <TextInput 
                placeholder="Search styles..."
                placeholderTextColor="#94a3b8"
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={componentStyles.searchInput}
            />
            <SearchIcon style={componentStyles.searchIcon} />
        </View>

        <View style={componentStyles.filterContainer}>
            {FILTERS.map(filter => (
                <TouchableOpacity 
                    key={filter}
                    onPress={() => setActiveFilter(filter)}
                    style={[componentStyles.filterButton, activeFilter === filter && componentStyles.activeFilterButton]}
                >
                    <Text style={[componentStyles.filterText, activeFilter === filter && componentStyles.activeFilterText]}>{filter}</Text>
                </TouchableOpacity>
            ))}
        </View>
        
        <FlatList
            data={filteredStyles}
            renderItem={renderStyleItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            contentContainerStyle={{ gap: 12 }}
            showsVerticalScrollIndicator={false}
        />

        <View style={componentStyles.footer}>
             <Text style={componentStyles.stylesAvailable}>{filteredStyles.length} styles available</Text>
            <TouchableOpacity onPress={onReset} style={componentStyles.resetButton}>
                <ResetIcon />
                <Text style={componentStyles.resetButtonText}>Start Over</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const componentStyles = StyleSheet.create({
    container: {
        backgroundColor: '#1e293b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#334155',
        padding: 16,
        gap: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#cbd5e1',
    },
    searchContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    searchInput: {
        backgroundColor: 'rgba(51, 65, 85, 0.5)',
        borderRadius: 8,
        paddingLeft: 40,
        paddingRight: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#475569',
        color: '#e2e8f0',
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        color: '#94a3b8'
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: '#334155',
    },
    activeFilterButton: {
        backgroundColor: '#4f46e5',
    },
    filterText: {
        color: '#cbd5e1',
        fontSize: 14,
    },
    activeFilterText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    styleItem: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#334155',
    },
    selectedStyleItem: {
        borderColor: '#4f46e5',
    },
    styleImage: {
        width: '100%',
        aspectRatio: 1,
    },
    styleNameContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        padding: 6,
    },
    styleName: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 12,
        color: '#e2e8f0',
    },
    footer: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#334155',
        alignItems: 'center',
        gap: 12,
    },
    stylesAvailable: {
        fontSize: 14,
        color: '#94a3b8',
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#334155',
        borderRadius: 8,
    },
    resetButtonText: {
        color: '#e2e8f0',
        fontSize: 14,
        fontWeight: '500',
    },
});