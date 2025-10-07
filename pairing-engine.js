// Global variable to store current pairing data
let currentPairingData = null;

// ADVANCED AI PAIRING ENGINE WITH MACHINE LEARNING SIMULATION
const advancedPairingAI = {
    // Flavor Compatibility Matrix
    flavorMatrix: {
        'espresso': {
            profile: { bitter: 9, sweet: 2, sour: 7, salty: 1, umami: 3 },
            bestMatches: {
                'almond-biscotti': 95, 'tiramisu': 92, 'chocolate-muffin': 85,
                'croissant': 78, 'eclair': 88, 'danish': 75,
                'blueberry-scone': 70, 'cinnamon-roll': 73
            },
            flavor: 'bold, intense',
            season: 'all',
            timeOfDay: 'morning'
        },
        'cappuccino': {
            profile: { bitter: 5, sweet: 5, sour: 4, salty: 1, umami: 2 },
            bestMatches: {
                'croissant': 94, 'danish': 89, 'cinnamon-roll': 91,
                'chocolate-muffin': 86, 'eclair': 82, 'blueberry-scone': 88,
                'almond-biscotti': 76, 'tiramisu': 84
            },
            flavor: 'creamy, balanced',
            season: 'autumn, winter',
            timeOfDay: 'morning, afternoon'
        },
        'latte': {
            profile: { bitter: 3, sweet: 6, sour: 3, salty: 1, umami: 2 },
            bestMatches: {
                'blueberry-scone': 93, 'chocolate-muffin': 90, 'danish': 87,
                'cinnamon-roll': 92, 'croissant': 85, 'eclair': 88,
                'tiramisu': 79, 'almond-biscotti': 71
            },
            flavor: 'mild, milky',
            season: 'all',
            timeOfDay: 'all day'
        },
        'americano': {
            profile: { bitter: 8, sweet: 1, sour: 6, salty: 1, umami: 2 },
            bestMatches: {
                'croissant': 91, 'almond-biscotti': 93, 'danish': 86,
                'chocolate-muffin': 82, 'tiramisu': 77, 'eclair': 79,
                'cinnamon-roll': 75, 'blueberry-scone': 81
            },
            flavor: 'strong, clean',
            season: 'all',
            timeOfDay: 'morning'
        },
        'macchiato': {
            profile: { bitter: 7, sweet: 3, sour: 6, salty: 1, umami: 2 },
            bestMatches: {
                'tiramisu': 94, 'eclair': 91, 'chocolate-muffin': 88,
                'danish': 83, 'croissant': 80, 'cinnamon-roll': 86,
                'almond-biscotti': 82, 'blueberry-scone': 77
            },
            flavor: 'espresso-forward, spotted',
            season: 'all',
            timeOfDay: 'afternoon'
        },
        'flat-white': {
            profile: { bitter: 6, sweet: 4, sour: 5, salty: 1, umami: 3 },
            bestMatches: {
                'croissant': 92, 'blueberry-scone': 89, 'danish': 87,
                'chocolate-muffin': 84, 'eclair': 85, 'cinnamon-roll': 83,
                'almond-biscotti': 78, 'tiramisu': 86
            },
            flavor: 'velvety, strong',
            season: 'all',
            timeOfDay: 'morning'
        },
        'mocha': {
            profile: { bitter: 4, sweet: 8, sour: 2, salty: 1, umami: 3 },
            bestMatches: {
                'cinnamon-roll': 90, 'danish': 88, 'croissant': 93,
                'blueberry-scone': 82, 'chocolate-muffin': 78,
                'eclair': 85, 'almond-biscotti': 70, 'tiramisu': 75, 'muffin': 85, 'scone': 82
            },
            flavor: 'chocolatey, sweet',
            season: 'winter',
            timeOfDay: 'afternoon, evening'
        },
        'cold-brew': {
            profile: { bitter: 5, sweet: 1, sour: 2, salty: 0, umami: 4 },
            bestMatches: {
                'chocolate-muffin': 91, 'danish': 88, 'eclair': 92,
                'tiramisu': 87, 'croissant': 83, 'cinnamon-roll': 85,
                'blueberry-scone': 86, 'almond-biscotti': 79
            },
            flavor: 'smooth, refreshing',
            season: 'summer',
            timeOfDay: 'afternoon'
        }
    },

    // Customer Preference Learning
    customerPreferences: {
        morning: { intensity: 0.8, sweetness: 0.3, richness: 0.5 },
        afternoon: { intensity: 0.5, sweetness: 0.6, richness: 0.7 },
        evening: { intensity: 0.3, sweetness: 0.8, richness: 0.8 }
    },

    // Advanced scoring algorithm
    calculateAdvancedScore(coffee, pastry, coffeeData, pastryData) {
        // Base compatibility score from matrix
        let baseScore = this.flavorMatrix[coffee]?.bestMatches[pastry] || 70;
        
        // Time-based adjustment
        const hour = new Date().getHours();
        const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
        const timePref = this.customerPreferences[timeOfDay];
        
        // Extract attributes
        const intensity = parseInt(coffeeData.dataset.intensity || 5);
        const sweetness = parseInt(pastryData.dataset.sweetness || 5);
        const richness = parseInt(pastryData.dataset.richness || 5);
        
        // Time preference adjustment
        const timeAdjustment = 
            (10 - Math.abs(intensity - timePref.intensity * 10)) * 0.3 +
            (10 - Math.abs(sweetness - timePref.sweetness * 10)) * 0.3 +
            (10 - Math.abs(richness - timePref.richness * 10)) * 0.3;
        
        // Stock optimization factor
        const coffeeStock = parseInt(coffeeData.dataset.stock);
        const pastryStock = parseInt(pastryData.dataset.stock);
        const stockOptimization = this.calculateStockOptimization(coffeeStock, pastryStock);
        
        // Profit maximization
        const profitScore = this.calculateProfitScore(
            parseFloat(coffeeData.dataset.profit),
            parseFloat(pastryData.dataset.profit)
        );
        
        // Weather adaptation (simulated)
        const weatherScore = this.getWeatherAdaptation(coffee, pastry);
        
        // Final weighted score
        const finalScore = 
            baseScore * 0.4 +           // Flavor compatibility (40%)
            timeAdjustment * 2 +         // Time preference (20%)
            stockOptimization * 0.2 +    // Stock optimization (20%)
            profitScore * 0.15 +         // Profit factor (15%)
            weatherScore * 0.05;         // Weather adaptation (5%)
        
        return Math.min(99, Math.round(finalScore));
    },

    calculateStockOptimization(coffeeStock, pastryStock) {
        // Prioritize low stock items (push them)
        const avgStock = (coffeeStock + pastryStock) / 2;
        if (avgStock < 30) return 100;  // Urgent - push hard
        if (avgStock < 50) return 85;   // Need to move
        if (avgStock < 70) return 70;   // Normal
        return 50;  // Overstocked - don't push
    },

    calculateProfitScore(coffeeProfit, pastryProfit) {
        const totalProfit = coffeeProfit + pastryProfit;
        if (totalProfit > 9) return 100;
        if (totalProfit > 7) return 85;
        if (totalProfit > 5) return 70;
        return 60;
    },

    getWeatherAdaptation(coffee, pastry) {
        // Simulate weather impact (in real app, use weather API)
        const month = new Date().getMonth();
        const isWinter = month >= 10 || month <= 2;
        const isSummer = month >= 5 && month <= 8;
        
        if (isWinter) {
            // Prefer hot, rich combinations
            if (['mocha', 'cappuccino', 'latte'].includes(coffee) && 
                ['cinnamon-roll', 'tiramisu'].includes(pastry)) {
                return 90;
            }
        } else if (isSummer) {
            // Prefer cold, light combinations
            if (coffee === 'cold-brew' && 
                ['danish', 'eclair', 'blueberry-scone'].includes(pastry)) {
                return 95;
            }
        }
        return 75;
    },

    generateSmartMarketing(coffee, pastry, score, data) {
        const insights = [];
        const hour = new Date().getHours();
        
        // Time-based insights
        if (hour < 10) {
            insights.push("MORNING SPECIAL: Perfect energy boost to start your day!");
        } else if (hour >= 14 && hour < 17) {
            insights.push("AFTERNOON PICK-ME-UP: Beat the 3pm slump with this perfect pairing!");
        }
        
        // Score-based recommendations
        if (score >= 95) {
            insights.push("AI TOP PICK: Our algorithm rates this as an EXCEPTIONAL match!");
        } else if (score >= 90) {
            insights.push("HIGHLY RECOMMENDED: 92% of customers who try this become regulars!");
        } else if (score >= 85) {
            insights.push("CUSTOMER FAVORITE: Consistently high ratings from our community!");
        }
        
        // Stock-driven promotions
        const avgStock = (parseInt(data.coffeeStock) + parseInt(data.pastryStock)) / 2;
        if (avgStock < 35) {
            insights.push("LIMITED AVAILABILITY: Only a few left today - order now!");
        } else if (avgStock < 50) {
            insights.push("TRENDING NOW: This pairing is flying off our shelves!");
        }
        
        // Profit optimization messaging
        if (data.profit > 8) {
            insights.push("PREMIUM SELECTION: Indulge in our finest offerings!");
        }
        
        // Seasonal push
        const month = new Date().getMonth();
        if (month === 11 || month === 0) {
            insights.push("WINTER WARMER: Cozy up with this seasonal favorite!");
        } else if (month >= 6 && month <= 8) {
            insights.push("SUMMER SENSATION: Refreshing combination for warm days!");
        }
        
        // Build final marketing text
        const baseText = `Experience the extraordinary harmony of ${data.coffeeName} paired with our artisanal ${data.pastryName}. `;
        
        const flavorNotes = this.getFlavorDescription(coffee, pastry);
        const primaryInsight = insights[0] || "";
        const secondaryInsight = insights[1] || "";
        
        return baseText + flavorNotes + " " + primaryInsight + " " + secondaryInsight;
    },

    getFlavorDescription(coffee, pastry) {
        const descriptions = {
            'espresso': {
                'almond-biscotti': "The nutty crunch perfectly complements the bold espresso notes.",
                'tiramisu': "Italian perfection - coffee-soaked layers meet concentrated espresso.",
                'default': "Bold intensity balanced with delicate sweetness."
            },
            'cappuccino': {
                'croissant': "Buttery layers melt into velvety foam for pure indulgence.",
                'cinnamon-roll': "Warm spices dance with creamy coffee in perfect harmony.",
                'default': "Creamy sophistication meets artisanal craftsmanship."
            },
            'latte': {
                'blueberry-scone': "Fresh berry tartness cuts through milky smoothness beautifully.",
                'chocolate-muffin': "Chocolate and coffee unite in a symphony of comfort.",
                'default': "Smooth, mild coffee embraces sweet pastry perfection."
            },
            'default': {
                'default': "A thoughtfully crafted pairing that delights the palate."
            }
        };
        
        return (descriptions[coffee] && descriptions[coffee][pastry]) || 
               (descriptions[coffee] && descriptions[coffee]['default']) ||
               descriptions['default']['default'];
    }
};

function updateStockIndicator() {
    const coffee = document.getElementById('coffee');
    const pastry = document.getElementById('pastry');
    
    if (coffee && coffee.value) {
        const stock = parseInt(coffee.selectedOptions[0].dataset.stock);
        const stockDiv = document.getElementById('coffee-stock');
        stockDiv.innerHTML = `<i class="fa-solid fa-chart-simple"></i> Stock: ${stock}%`;
        stockDiv.className = 'stock-indicator ' + (stock > 70 ? 'stock-high' : stock > 40 ? 'stock-medium' : 'stock-low');
    }
    
    if (pastry && pastry.value) {
        const stock = parseInt(pastry.selectedOptions[0].dataset.stock);
        const stockDiv = document.getElementById('pastry-stock');
        stockDiv.innerHTML = `<i class="fa-solid fa-chart-simple"></i> Stock: ${stock}%`;
        stockDiv.className = 'stock-indicator ' + (stock > 70 ? 'stock-high' : stock > 40 ? 'stock-medium' : 'stock-low');
    }
}

function generatePairing() {
    const coffee = document.getElementById('coffee').value;
    const pastry = document.getElementById('pastry').value;
    
    if (!coffee || !pastry) {
        alert('Please select both a coffee and a pastry!');
        return;
    }
    
    // Show loading
    document.getElementById('loading').classList.add('show');
    
    // Simulate AI processing
    setTimeout(() => {
        const coffeeData = document.getElementById('coffee').selectedOptions[0];
        const pastryData = document.getElementById('pastry').selectedOptions[0];
        
        const coffeeStock = parseInt(coffeeData.dataset.stock);
        const pastryStock = parseInt(pastryData.dataset.stock);
        const coffeeProfit = parseFloat(coffeeData.dataset.profit);
        const pastryProfit = parseFloat(pastryData.dataset.profit);
        
        const avgStock = Math.round((coffeeStock + pastryStock) / 2);
        const totalProfit = coffeeProfit + pastryProfit;
        
        // Use advanced AI scoring
        const pairingScore = advancedPairingAI.calculateAdvancedScore(
            coffee, pastry, coffeeData, pastryData
        );
        
        // Calculate demand based on stock (inverse relationship)
        const demand = avgStock < 40 ? 'Very High' : avgStock < 60 ? 'High' : avgStock < 80 ? 'Medium' : 'Low';
        
        // Prepare data for marketing generation
        const marketingData = {
            coffeeName: coffeeData.text.split(' - ')[0],
            pastryName: pastryData.text.split(' - ')[0],
            coffeeStock: coffeeStock,
            pastryStock: pastryStock,
            profit: totalProfit
        };
        
        // Store current pairing data
        currentPairingData = {
            coffee: coffeeData.text,
            pastry: pastryData.text,
            score: pairingScore,
            coffeeStock: coffeeStock,
            pastryStock: pastryStock,
            avgStock: avgStock,
            profit: totalProfit,
            demand: demand,
            marketingText: advancedPairingAI.generateSmartMarketing(coffee, pastry, pairingScore, marketingData),
            timestamp: new Date().toISOString(),
            season: advancedPairingAI.flavorMatrix[coffee]?.season || 'all seasons',
            bestTime: advancedPairingAI.flavorMatrix[coffee]?.timeOfDay || 'all day',
            flavorProfile: advancedPairingAI.flavorMatrix[coffee]?.flavor || 'delightful',
            aiConfidence: pairingScore,
            algorithm: 'BrewlyAI v2.0 Advanced'
        };
        
        // Update UI
        document.getElementById('pairing-title').textContent = 
            `${coffeeData.text.split(' - ')[0]} + ${pastryData.text.split(' - ')[0]}`;
        document.getElementById('score').textContent = `${pairingScore}%`;
        document.getElementById('stars').textContent = '★'.repeat(Math.ceil(pairingScore / 20));
        document.getElementById('marketing-text').textContent = currentPairingData.marketingText;
        document.getElementById('profit-metric').textContent = `$${totalProfit.toFixed(2)}`;
        document.getElementById('stock-metric').textContent = `${avgStock}%`;
        document.getElementById('demand-metric').textContent = demand;
        document.getElementById('season-metric').textContent = 
            currentPairingData.season.split(',')[0].trim().charAt(0).toUpperCase() + 
            currentPairingData.season.split(',')[0].trim().slice(1);
        
        // Hide loading, show output
        document.getElementById('loading').classList.remove('show');
        document.getElementById('output').classList.add('show');
        
        // Smooth scroll to results
        document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
}

function generateAdvancedPairing() {
    const coffee = document.getElementById('coffee-adv').value;
    const pastry = document.getElementById('pastry-adv').value;
    const season = document.getElementById('season').value;
    const venue = document.getElementById('venue').value;
    const target = document.getElementById('target').value;
    const minProfit = document.getElementById('profit-margin').value;
    
    // Show loading
    document.getElementById('loading').classList.add('show');
    
    setTimeout(() => {
        // Advanced B2B logic
        const baseProfit = 4.5 + Math.random() * 3;
        const seasonMultiplier = {
            'spring': 1.1,
            'summer': 0.9,
            'autumn': 1.2,
            'winter': 1.3
        }[season];
        
        const venueMultiplier = {
            'cafe': 1.0,
            'restaurant': 1.2,
            'hotel': 1.4,
            'office': 0.9
        }[venue];
        
        const targetBonus = {
            'millennials': 'Instagram-worthy presentation recommended. Use latte art and garnishes.',
            'professionals': 'Quick service priority. Pre-prepare popular combinations.',
            'students': 'Student discount available. Bundle deals increase sales 35%.',
            'tourists': 'Local specialty highlight. Include origin story in marketing.'
        }[target];
        
        const finalProfit = (baseProfit * seasonMultiplier * venueMultiplier).toFixed(2);
        const score = 85 + Math.floor(Math.random() * 15);
        
        // Advanced B2B insights
        const b2bInsights = [];
        
        // Venue-specific recommendations
        if (venue === 'hotel') {
            b2bInsights.push("HOTEL OPTIMIZATION: Price premium of 40% acceptable. Focus on presentation.");
        } else if (venue === 'office') {
            b2bInsights.push("OFFICE SETTING: Speed is key. Pre-order system increases efficiency 60%.");
        } else if (venue === 'cafe') {
            b2bInsights.push("CAFÉ SETTING: Create cozy atmosphere. Display pairing suggestions prominently.");
        }
        
        // Target audience insights
        if (target === 'millennials') {
            b2bInsights.push("SOCIAL MEDIA: This pairing generates 3x more social shares.");
        } else if (target === 'professionals') {
            b2bInsights.push("CORPORATE: Loyalty program adoption rate 78% with this demographic.");
        }
        
        // Seasonal strategy
        const seasonStrategy = {
            'spring': "Spring menu refresh drives 25% increase in foot traffic.",
            'summer': "Iced variants of this pairing boost summer sales by 40%.",
            'autumn': "Pumpkin spice variant increases autumn revenue 35%.",
            'winter': "Holiday packaging on this combo increases gifting sales 50%."
        }[season];
        
        b2bInsights.push(seasonStrategy);
        
        const marketingText = `B2B STRATEGIC RECOMMENDATION: ${coffee.charAt(0).toUpperCase() + coffee.slice(1)} + ${pastry.charAt(0).toUpperCase() + pastry.slice(1)} optimized for ${venue} targeting ${target}. Expected profit margin: ${(finalProfit/10*100).toFixed(0)}%. ${targetBonus} ${b2bInsights.join(' ')} ROI projection: ${(score * 1.2).toFixed(0)}% increase in category sales.`;
        
        currentPairingData = {
            coffee: coffee.charAt(0).toUpperCase() + coffee.slice(1),
            pastry: pastry.charAt(0).toUpperCase() + pastry.slice(1),
            score: score,
            profit: parseFloat(finalProfit),
            avgStock: 75,
            demand: 'High',
            marketingText: marketingText,
            timestamp: new Date().toISOString(),
            season: season,
            venue: venue,
            targetAudience: target,
            profitMargin: minProfit,
            b2bMode: true,
            algorithm: 'BrewlyAI B2B Analytics Engine'
        };
        
        // Update UI
        document.getElementById('pairing-title').textContent = `B2B: ${coffee} + ${pastry}`;
        document.getElementById('score').textContent = `${score}%`;
        document.getElementById('stars').textContent = '★'.repeat(Math.ceil(score / 20));
        document.getElementById('marketing-text').textContent = currentPairingData.marketingText;
        document.getElementById('profit-metric').textContent = `$${finalProfit}`;
        document.getElementById('stock-metric').textContent = '75%';
        document.getElementById('demand-metric').textContent = 'High';
        document.getElementById('season-metric').textContent = season.charAt(0).toUpperCase() + season.slice(1);
        
        document.getElementById('loading').classList.remove('show');
        document.getElementById('output').classList.add('show');
        document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
}

function generateCustomPairing() {
    const coffee = document.getElementById('custom-coffee').value;
    const pastry = document.getElementById('custom-pastry').value;
    const stock = document.getElementById('custom-stock').value;
    const profit = document.getElementById('custom-profit').value;
    const notes = document.getElementById('custom-notes').value;
    
    if (!coffee || !pastry) {
        alert('Please enter both coffee and pastry names!');
        return;
    }
    
    document.getElementById('loading').classList.add('show');
    
    setTimeout(() => {
        // AI analysis for custom items
        const aiAnalysis = analyzeCustomPairing(coffee, pastry, stock, profit, notes);
        const score = aiAnalysis.score;
        const demand = stock < 40 ? 'Very High' : stock < 60 ? 'High' : stock < 80 ? 'Medium' : 'Low';
        
        currentPairingData = {
            coffee: coffee,
            pastry: pastry,
            score: score,
            profit: parseFloat(profit),
            avgStock: parseInt(stock),
            demand: demand,
            marketingText: aiAnalysis.marketing,
            timestamp: new Date().toISOString(),
            customNotes: notes,
            isCustom: true,
            aiInsights: aiAnalysis.insights,
            algorithm: 'BrewlyAI Custom Analysis Engine'
        };
        
        document.getElementById('pairing-title').textContent = `Custom: ${coffee} + ${pastry}`;
        document.getElementById('score').textContent = `${score}%`;
        document.getElementById('stars').textContent = '★'.repeat(Math.ceil(score / 20));
        document.getElementById('marketing-text').textContent = currentPairingData.marketingText;
        document.getElementById('profit-metric').textContent = `$${profit}`;
        document.getElementById('stock-metric').textContent = `${stock}%`;
        document.getElementById('demand-metric').textContent = demand;
        document.getElementById('season-metric').textContent = 'Custom';
        
        document.getElementById('loading').classList.remove('show');
        document.getElementById('output').classList.add('show');
        document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
}

function analyzeCustomPairing(coffee, pastry, stock, profit, notes) {
    // AI analysis for custom items using NLP-like pattern matching
    const coffeeKeywords = coffee.toLowerCase();
    const pastryKeywords = pastry.toLowerCase();
    
    let baseScore = 75;
    const insights = [];
    
    // Coffee type detection
    if (coffeeKeywords.includes('espresso') || coffeeKeywords.includes('dark')) {
        baseScore += 5;
        insights.push("Strong coffee detected - pairs well with sweet pastries");
    }
    if (coffeeKeywords.includes('latte') || coffeeKeywords.includes('milk')) {
        baseScore += 3;
        insights.push("Milk-based coffee - versatile pairing options");
    }
    if (coffeeKeywords.includes('cold') || coffeeKeywords.includes('iced')) {
        insights.push("Cold beverage - recommend for warm weather");
    }
    
    // Pastry type detection
    if (pastryKeywords.includes('chocolate')) {
        baseScore += 5;
        insights.push("Chocolate detected - universal pairing enhancer");
    }
    if (pastryKeywords.includes('fruit') || pastryKeywords.includes('berry')) {
        baseScore += 4;
        insights.push("Fruit elements add refreshing contrast");
    }
    if (pastryKeywords.includes('nut') || pastryKeywords.includes('almond')) {
        baseScore += 3;
        insights.push("Nutty flavors complement coffee naturally");
    }
    
    // Stock-based scoring
    const stockInt = parseInt(stock);
    if (stockInt < 30) {
        baseScore += 10;
        insights.push("LOW STOCK: Push this item immediately");
    }
    
    // Profit-based scoring
    const profitFloat = parseFloat(profit);
    if (profitFloat > 6) {
        baseScore += 8;
        insights.push("HIGH MARGIN: Excellent profit potential");
    }
    
    // Final score adjustment
    const finalScore = Math.min(95, baseScore + Math.random() * 10);
    
    // Generate marketing
    const marketing = `CUSTOM PAIRING ANALYSIS: ${coffee} meets ${pastry} - a unique combination with ${finalScore.toFixed(0)}% compatibility score. ` +
        `${insights.join('. ')}. ` +
        `With ${stock}% stock and $${profit} profit margin, this pairing offers ${stockInt < 50 ? 'immediate sales opportunity' : 'steady revenue potential'}. ` +
        `${notes ? `Special considerations: ${notes}.` : ''} ` +
        `AI RECOMMENDATION: ${finalScore > 85 ? 'Highly Recommended' : finalScore > 75 ? 'Recommended' : 'Worth Testing'} for your menu.`;
    
    return {
        score: Math.round(finalScore),
        marketing: marketing,
        insights: insights
    };
}

// Download functions
function downloadCSV() {
    if (!currentPairingData) {
        alert('Please generate a pairing first!');
        return;
    }
    
    const csvContent = [
        ['Field', 'Value'],
        ['Coffee', currentPairingData.coffee],
        ['Pastry', currentPairingData.pastry],
        ['AI Compatibility Score', currentPairingData.score + '%'],
        ['Estimated Profit', '$' + (currentPairingData.profit?.toFixed ? currentPairingData.profit.toFixed(2) : currentPairingData.profit)],
        ['Stock Level', currentPairingData.avgStock + '%'],
        ['Demand Level', currentPairingData.demand],
        ['Marketing Text', '"' + currentPairingData.marketingText.replace(/"/g, '""') + '"'],
        ['Generated At', currentPairingData.timestamp],
        ['AI Algorithm', currentPairingData.algorithm || 'BrewlyAI v2.0']
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brewly_ai_pairing_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function downloadJSON() {
    if (!currentPairingData) {
        alert('Please generate a pairing first!');
        return;
    }
    
    const blob = new Blob([JSON.stringify(currentPairingData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brewly_ai_pairing_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function downloadHTML() {
    if (!currentPairingData) {
        alert('Please generate a pairing first!');
        return;
    }
    
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
<title>Brewly AI - Coffee Pairing Report</title>
<meta charset="UTF-8">
<style>
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;
        background: linear-gradient(135deg, #6F4E37 0%, #3C2414 100%);
        min-height: 100vh;
    }
    .report-card {
        background: #FFF8E7;
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    h1 {
        color: #6F4E37;
        border-bottom: 3px solid #D4A574;
        padding-bottom: 15px;
        font-size: 2.5em;
    }
    .metric {
        display: inline-block;
        margin: 10px 20px 10px 0;
        padding: 12px 24px;
        background: linear-gradient(135deg, #6F4E37 0%, #967259 100%);
        color: #FFF8E7;
        border-radius: 10px;
        font-weight: bold;
    }
    .marketing-box {
        background: #FFEEDD;
        padding: 25px;
        border-radius: 15px;
        margin: 20px 0;
        line-height: 1.8;
        border-left: 5px solid #D4A574;
    }
</style>
</head>
<body>
<div class="report-card">
    <h1>Brewly AI - Coffee Pairing Report</h1>
    <h2>Pairing: ${currentPairingData.coffee} + ${currentPairingData.pastry}</h2>
    <div style="font-size: 48px; color: #6F4E37; font-weight: bold; text-align: center; margin: 30px 0;">
        AI Compatibility: ${currentPairingData.score}%
        <div style="color: #D4A574; font-size: 36px;">${'★'.repeat(Math.ceil(currentPairingData.score / 20))}</div>
    </div>
    <h3>Key Metrics</h3>
    <div class="metric">Profit: $${currentPairingData.profit?.toFixed ? currentPairingData.profit.toFixed(2) : currentPairingData.profit}</div>
    <div class="metric">Stock: ${currentPairingData.avgStock}%</div>
    <div class="metric">Demand: ${currentPairingData.demand}</div>
    <h3>Marketing Recommendation</h3>
    <div class="marketing-box">${currentPairingData.marketingText}</div>
    <p style="color: #967259; margin-top: 40px; text-align: right; font-style: italic;">
        Report generated: ${new Date(currentPairingData.timestamp).toLocaleString()}<br>
        Powered by ${currentPairingData.algorithm || 'Brewly AI v2.0'}
    </p>
</div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brewly_ai_report_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
