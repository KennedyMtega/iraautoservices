// Booking System for IRA Auto Services Limited

document.addEventListener('DOMContentLoaded', function() {
    const bookingModal = document.getElementById('bookingModal');
    const bookingForm = document.getElementById('bookingForm');
    const timeSlots = document.querySelectorAll('.time-slot');
    const dateInput = document.getElementById('bookingDate');
    
    // Initialize date picker (set min date to today)
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
        
        // Disable weekends
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const dayOfWeek = selectedDate.getDay();
            
            // 0 = Sunday, 6 = Saturday
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                alert('Please select a weekday. We are closed on weekends.');
                this.value = '';
            }
        });
    }
    
    // Time slot selection
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected class from all slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            // Add selected class to clicked slot
            this.classList.add('selected');
            
            // Update hidden input if exists
            const timeInput = document.getElementById('selectedTime');
            if (timeInput) {
                timeInput.value = this.textContent.trim();
            }
        });
    });
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('bookingName').value,
                email: document.getElementById('bookingEmail').value,
                phone: document.getElementById('bookingPhone').value,
                service: document.getElementById('bookingService').value,
                location: document.getElementById('bookingLocation').value,
                date: document.getElementById('bookingDate').value,
                time: document.querySelector('.time-slot.selected')?.textContent.trim() || ''
            };
            
            // Validate form
            if (!validateBookingForm(formData)) {
                return;
            }
            
            // Format message for WhatsApp
            const message = formatWhatsAppMessage(formData);
            
            // Open WhatsApp with pre-filled message
            const phoneNumber = '255752008008'; // Tanzania WhatsApp number
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showBookingSuccess();
            
            // Reset form
            bookingForm.reset();
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Close modal after a delay
            setTimeout(() => {
                closeModal('bookingModal');
            }, 2000);
        });
    }
});

function validateBookingForm(data) {
    if (!data.name || data.name.trim().length < 2) {
        alert('Please enter your full name.');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!data.phone || data.phone.trim().length < 10) {
        alert('Please enter a valid phone number.');
        return false;
    }
    
    if (!data.service || data.service === '') {
        alert('Please select a service.');
        return false;
    }
    
    if (!data.location || data.location === '') {
        alert('Please select a location.');
        return false;
    }
    
    if (!data.date) {
        alert('Please select a date.');
        return false;
    }
    
    if (!data.time) {
        alert('Please select a time slot.');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function formatWhatsAppMessage(data) {
    return `Hello IRA Auto Services Limited!

I would like to book an appointment:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}
Location: ${data.location}
Date: ${data.date}
Time: ${data.time}

Thank you!`;
}

function showBookingSuccess() {
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    successMsg.textContent = '✓ Booking request sent! Opening WhatsApp...';
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

