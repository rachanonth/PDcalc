import React, { Component } from 'react';
import Footer from './Footer';
import { Link } from "react-router-dom";

class BMICalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '50',
      height: '150',
      ageRange: ' ',
      bmi: null,
      result: null,
    };
  }

  calculateBMI = () => {
    const { weight, height, ageRange } = this.state;

    if (!weight || !height || !ageRange) {
      alert('Please enter weight, height, and select an age range.');
      return;
    }

    const weightInKg = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100; // Convert height to meters

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    this.setState({ bmi });

    // Determine the result based on age and BMI
    let result = null;

    if (ageRange === '< 19') {
      result = this.determineResult(bmi, '< 19');
    } else if (ageRange === '19 - 40') {
      result = this.determineResult(bmi, '19 - 40');
    } else if (ageRange === '> 40') {
      result = this.determineResult(bmi, '> 40');
    }

    this.setState({ result });
  };

  determineResult = (bmi, ageRange) => {
    const bmiCategory = this.determineBMICategory(bmi);

    // Define a mapping object for full results
    const fullResultMapping = {
      '< 19': {
        a: {
          key: 'a',
          color: 'lightblue',
          fullResult: 'Result A',
          sampleDrug: 'Sample Drug A',
        },
        b: {
          key: 'b',
          color: 'pink',
          fullResult: 'Result B',
          sampleDrug: 'Sample Drug B',
        },
        c: {
          key: 'c',
          color: 'white',
          fullResult: 'Result C',
          sampleDrug: 'Sample Drug C',
        },
        d: {
          key: 'd',
          color: 'orange',
          fullResult: 'Result D',
          sampleDrug: 'Sample Drug D',
        },
      },
      '19 - 40': {
            a: {
          key: 'a',
          color: 'lightblue',
          fullResult: 'Result e',
          sampleDrug: 'Sample Drug A',
        },
        b: {
          key: 'b',
          color: 'pink',
          fullResult: 'Result f',
          sampleDrug: 'Sample Drug B',
        },
        c: {
          key: 'c',
          color: 'white',
          fullResult: 'Result g',
          sampleDrug: 'Sample Drug C',
        },
        d: {
          key: 'd',
          color: 'orange',
          fullResult: 'Result h',
          sampleDrug: 'Sample Drug D',
        },
      },
      '> 40': {
           a: {
          key: 'a',
          color: 'lightblue',
          fullResult: 'Result i',
          sampleDrug: 'Sample Drug A',
        },
        b: {
          key: 'b',
          color: 'pink',
          fullResult: 'Result j',
          sampleDrug: 'Sample Drug B',
        },
        c: {
          key: 'c',
          color: 'white',
          fullResult: 'Result k',
          sampleDrug: 'Sample Drug C',
        },
        d: {
          key: 'd',
          color: 'orange',
          fullResult: 'Result l',
          sampleDrug: 'Sample Drug D',
        },
      },
    };

    return fullResultMapping[ageRange][bmiCategory];
  };

  determineBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return 'a';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'b';
    } else if (bmi >= 25 && bmi < 30) {
      return 'c';
    } else {
      return 'd';
    }
  };

  render() {
    const { bmi, result } = this.state;

    return (
      <div>
        <h1>BMI Calculator</h1>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            value={this.state.weight}
            onChange={(e) => this.setState({ weight: e.target.value })}
          />
        </div>
        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            value={this.state.height}
            onChange={(e) => this.setState({ height: e.target.value })}
          />
        </div>
        <div>
          <label>Age Range:</label>
          <div>
            <input
              type="radio"
              name="age"
              value="< 19"
              onChange={() => this.setState({ ageRange: '< 19' })}
            />
            <label>&lt; 19 years</label>
          </div>
          <div>
            <input
              type="radio"
              name="age"
              value="19-40"
              onChange={() => this.setState({ ageRange: '19 - 40' })}
            />
            <label>19 - 40 years</label>
          </div>
          <div>
            <input
              type="radio"
              name="age"
              value=">40"
              onChange={() => this.setState({ ageRange: '> 40' })}
            />
            <label>&gt; 40 years</label>
          </div>
        </div>
        <button onClick={this.calculateBMI}>View Contraception Guide</button>
        {bmi !== null && <p>Your BMI is: {bmi.toFixed(1)}</p>}
        {result && (
          <div>
            <p>Your Result: {result.fullResult}</p>
            <p>Key: {result.key}</p>
            <p>Color: {result.color}</p>
            <p>Sample Drug: {result.sampleDrug}</p>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default BMICalculator;
