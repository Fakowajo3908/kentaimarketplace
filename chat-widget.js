/**
 * ============================================================
 * KENTAI MARKETPLACE INTELLIGENT AGENT (Chatbot)
 * ============================================================
 * Self-contained. No API. No npm. No server. Just works.
 * 
 * 200+ Q&A entries covering everything a Nigerian marketplace
 * user could possibly ask modeled after Jumia assistant style.
 * 
 * WhatsApp redirect for "speak with someone" → +2347049412363
 * ============================================================
 */
(function(){
'use strict';

const WA = '+2347049412363';
const WA_LINK = 'https://wa.me/2347049412363';

// ============================================================
// KNOWLEDGE BASE 200+ ENTRIES
// ============================================================
const KB = [

/* ============================================================
   SECTION 1: GREETINGS & CONVERSATIONAL  (1-20)
   ============================================================ */
  {c:"conv", k:["hello","hi","hey","greetings","good day","howdy"],
   q:"Hello!", a:"Hello!  Welcome to Kentai Marketplace! I'm your smart assistant, here to help you with anything buying, selling, creating a store, payments, safety tips, or anything else. What can I help you with today?"},

  {c:"conv", k:["good morning"],
   q:"Good morning!", a:"Good morning! ☀ Great to see you on Kentai Marketplace. How can I help you today? Feel free to ask me anything about buying, selling, or using the platform!"},

  {c:"conv", k:["good afternoon"],
   q:"Good afternoon!", a:"Good afternoon!  I'm here to help. What would you like to know about Kentai Marketplace?"},

  {c:"conv", k:["good evening"],
   q:"Good evening!", a:"Good evening! ☾ Still here and ready to help you. What do you need assistance with?"},

  {c:"conv", k:["good night"],
   q:"Good night!", a:"Good night! ☾ Thanks for visiting Kentai Marketplace today. If you have any questions tomorrow, I'll be right here. Sweet dreams!"},

  {c:"conv", k:["help","what can you do","what do you do","how does this work","how can you help","what do you know","what can i ask"],
   q:"How can you help me?", a:"I can help you with almost anything on Kentai Marketplace! Here are some things you can ask me:\n\n▶ Buying How to search, filter, negotiate, inspect items, stay safe\n● Selling How to list, price, photograph, promote your items\n■ Stores How to create and manage your own store\n□ Payments Bank transfer, mobile money, cash, safety\n◆ Safety Avoiding scams, meeting safely, verifying items\n○ Account Login, registration, password, profile settings\n\nJust type your question naturally, like you would ask a friend!"},

  {c:"conv", k:["thank you","thanks","appreciate","helpful","great","awesome","amazing","wonderful"],
   q:"Thank you!", a:"You're welcome! ☺ I'm glad I could help. If you have more questions, just ask I'm always here. You can also click the WhatsApp button below to chat with our support team for personal assistance. Happy buying and selling on Kentai Marketplace!"},

  {c:"conv", k:["no problem","you're welcome","welcome"],
   q:"You're welcome!", a:"Anytime! I'm always here to help. Don't hesitate to ask if you need anything else. You can also click the WhatsApp button below to chat with our support team."},

  {c:"conv", k:["goodbye","bye","see you","see ya","take care","farewell"],
   q:"Goodbye!", a:"Goodbye!  Thanks for using Kentai Marketplace. Come back anytime you need help I'll be right here. You can also click the WhatsApp button below to chat with our support team. Have a great day!"},

  {c:"conv", k:["who are you","are you real","are you human","are you a robot","are you ai","what are you"],
   q:"Who are you?", a:"I'm the Kentai Marketplace Intelligent Assistant a smart chatbot designed to answer your questions quickly and helpfully, just like a Jumia assistant! I can handle questions about buying, selling, stores, payments, safety, and more. However, if you'd like to speak with a real person, you can click the WhatsApp button below to chat with our support team. Click to chat: "+WA_LINK},

  {c:"conv", k:["i'm new","i just joined","new user","just registered","i'm new here","first time"],
   q:"I'm new here, how do I get started?", a:"Welcome to Kentai Marketplace!  Here's a quick guide to get you started:\n\n1. BROWSE Use the search bar at the top to find items, or browse by category.\n2. BUY Click on an item, check details, contact the seller via phone/WhatsApp, negotiate, and meet safely.\n3. SELL Click the 'Sell' button, fill in item details, upload photos, set your price, and submit. It's FREE!\n4. STORE Want a professional shop? Click 'Store' in the navigation to create your own store.\n\nThat's it! It's simple and free. What would you like to do first?"},

  {c:"conv", k:["i'm confused","i don't understand","i don't get it","explain","explain more","not clear"],
   q:"I'm confused, can you explain?", a:"Of course! Let me break it down simply. Kentai Marketplace is like a big online market where people list things they want to sell, and you can browse, contact them, negotiate, and buy. Think of it like a Jumia or Jiji, but with direct seller contact. What specifically are you confused about? I'll explain it in detail!"},

  {c:"conv", k:["not helpful","doesn't help","that's not what i asked","wrong answer","not useful"],
   q:"That wasn't helpful.", a:"I'm sorry about that! Let me try to help better. Could you rephrase your question or tell me more specifically what you need? For example:\n\n• Are you trying to buy something?\n• Are you trying to sell something?\n• Do you have an account issue?\n• Are you concerned about safety?\n\nOr if you prefer, you can click the WhatsApp button below to speak directly with our admin, they'll give you personalized help."},

  {c:"conv", k:["frustrated","not working","annoying","this sucks","i hate this","terrible"],
   q:"I'm frustrated with this platform.", a:"I understand your frustration, and I'm sorry you're having a bad experience. I want to help make things right. Here are your options:\n\n1. Tell me your specific problem and I'll try to resolve it right now.\n2. Click the WhatsApp button below to chat with our admin directly, they can help with account issues, technical problems, or complaints.\n3. Submit feedback through the Contact page (contact.html).\n\nYour feedback matters and helps us improve. What's the specific issue you're facing?"},

  {c:"conv", k:["urgent","emergency","immediately","asap","need help now","help me now"],
   q:"I need urgent help!", a:"I understand you need urgent help! For the fastest assistance, please click the WhatsApp button below to chat with our support team directly they can respond to urgent matters quickly. If it's about a scam or fraud, please also report it on the listing page using the 'Report' button. I'm here to help with anything I can right now what's the emergency?"},

  {c:"conv", k:["complain","complaint","grievance","issue","problem","something wrong"],
   q:"I have a complaint.", a:"I'm sorry to hear that. I'd like to help resolve your issue. Please tell me what happened, and I'll do my best to assist. For formal complaints that need human attention, please click the WhatsApp button below to chat with our support team or use the Contact page (contact.html). What's the specific problem?"},

  {c:"conv", k:["scammed","i was scammed","someone scammed me","i lost money","i was cheated","i was defrauded"],
   q:"I was scammed!", a:"I'm very sorry that happened to you. This is serious. Here's what you should do immediately:\n\n1. REPORT If it happened through a listing, use the 'Report' button on that listing.\n2. CONTACT ADMIN Click the WhatsApp button below and send all details (screenshots, messages, payment proof).\n3. BANK If you sent money via bank transfer, contact your bank IMMEDIATELY to try to reverse the transaction.\n4. POLICE For significant amounts, file a report with the police or EFCC.\n5. SAVE EVIDENCE Keep all messages, receipts, and screenshots as evidence.\n\nTo prevent future scams, always meet in public, inspect items before paying, and verify seller identity."},

  {c:"conv", k:["website slow","app slow","not loading","page not loading","website not working","site down"],
   q:"The website/app is slow or not working.", a:"If the website is slow or not loading, try these steps:\n\n1. Refresh the page (press F5 or pull down on mobile).\n2. Check your internet connection try loading another site.\n3. Clear your browser cache and try again.\n4. Try a different browser (Chrome, Firefox, Safari).\n5. If on mobile data, switch to WiFi or vice versa.\n6. Try again in a few minutes there might be temporary high traffic.\n\nIf the problem persists, click the WhatsApp button below to chat with our support team and they'll check the server status."},

  {c:"conv", k:["can't upload","upload not working","photos not uploading","image upload fail","upload error"],
   q:"I can't upload photos.", a:"If photo upload isn't working, try these:\n\n1. Check your internet connection uploads need stable internet.\n2. Make sure photos are in JPG or PNG format.\n3. Ensure each photo is under 5MB in size.\n4. Try reducing photo size use a smaller resolution.\n5. Try uploading one photo at a time instead of multiple.\n6. Clear your browser cache and try again.\n7. Try a different browser or device.\n\nIf it still doesn't work, click the WhatsApp button below to chat with our support team."},

  {c:"conv", k:["listing disappeared","my listing is gone","listing vanished","where is my listing","listing missing"],
   q:"My listing disappeared!", a:"If your listing has disappeared, here's what might have happened:\n\n1. EXPIRED Listings may expire after a certain period. Check 'My Listings' to see if it's there but expired.\n2. MODERATION If it violated marketplace rules, it may have been removed. Review the terms on terms.html.\n3. DELETED Someone may have accidentally deleted it. Check 'My Listings' for confirmation.\n4. You can recreate the listing by going to the 'Sell' page and submitting it again.\n\nIf you believe it was removed unfairly, click the WhatsApp button below to chat with our support team with the listing details."},

  {c:"conv", k:["how does kentai work","how it works","explain kentai","what is this","platform explanation"],
   q:"How does Kentai Marketplace work?", a:"Kentai Marketplace works like a big online market simple and straightforward:\n\n1. SELLERS post items they want to sell with photos, descriptions, and prices.\n2. BUYERS browse or search for items they want.\n3. BUYERS contact sellers directly via phone or WhatsApp to negotiate.\n4. They meet at a safe public location to exchange the item and payment.\n5. The platform is FREE to use no commission, no middleman.\n\nThink of it like a digital version of a Nigerian market! You can also create a Store for a professional shop presence. It's that simple."},

  {c:"conv", k:["is kentai safe","is it safe","is kentai legit","is this real","is this a scam","can i trust this"],
   q:"Is Kentai Marketplace safe and legitimate?", a:"Yes, Kentai Marketplace is a legitimate platform! However, like any marketplace (even Jumia or Jiji), safety depends on how you use it. Here's how to stay safe:\n\n✓ Meet sellers in public, busy locations.\n✓ Inspect items thoroughly before paying.\n✓ Don't send money in advance unless you fully trust the seller.\n✓ Verify seller identity when possible.\n✓ Trust your instincts if something feels off, walk away.\n✓ Report suspicious listings using the Report button.\n✓ Read our safety tips in the chat just ask me 'safety tips'.\n\nThe platform connects you directly with sellers, so always follow these practices."},

/* ============================================================
   SECTION 2: BUYING GENERAL  (21-60)
   ============================================================ */
  {c:"buy", k:["how do i buy","how to buy","purchase","i want to buy","buying items","buy something","i need to buy"],
   q:"How do I buy an item?", a:"Buying on Kentai Marketplace is simple:\n\n1. SEARCH Use the search bar at the top to find what you want (e.g., 'iPhone 13', 'laptop', 'sofa').\n2. BROWSE Click on items to see details: photos, price, condition, seller info.\n3. FILTER Use filters to narrow by category, price range, condition, and sort options.\n4. CONTACT Call or WhatsApp the seller using the phone number on the listing.\n5. NEGOTIATE Most sellers expect negotiation. Be polite and fair.\n6. MEET Agree on a safe, public meeting place.\n7. INSPECT Check the item thoroughly before paying.\n8. PAY Agree on payment method (cash, transfer, mobile money).\n\nThat's it! No complicated checkout process just direct buyer-seller connection."},

  {c:"buy", k:["search","searching","how to search","find item","find product","look for","i need","i'm looking for"],
   q:"How do I search for items?", a:"Searching is easy:\n\n1. Use the search bar at the very top of the page it's visible on every page.\n2. Type keywords: 'iPhone', 'laptop', 'shoes', 'car', 'furniture', etc.\n3. Results appear in real-time as you type.\n4. Use filters to narrow results: Category, Price Range, Condition (New/Used), Sort (Newest/Cheapest/Most Popular).\n5. On mobile, tap the Filter button in the bottom navigation.\n\nTips: Be specific in your search. Instead of 'phone', try 'iPhone 12 pro max' or 'Samsung A52'. The more specific, the better your results!"},

  {c:"buy", k:["filter","filtering","narrow results","filter results","filter options"],
   q:"How do I use filters?", a:"Filters help you find exactly what you want:\n\n CATEGORY Electronics, Fashion, Vehicles, Home & Furniture, Services, etc.\n● PRICE RANGE Under ₦10,000 | ₦10,000-₦50,000 | ₦50,000-₦200,000 | etc.\n✶ CONDITION New | Used | Refurbished\n❐ SORT Newest | Cheapest | Most Popular\n\nOn desktop, filters appear on the left side. On mobile, tap the 'Filter' button in the bottom navigation bar. Combine multiple filters for the most precise results!"},

  {c:"buy", k:["category","categories","browse categories","what categories","types of products","sections","what can i find"],
   q:"What categories are available?", a:"Kentai Marketplace has a wide variety of categories:\n\n❐ Electronics Phones, laptops, tablets, TVs, gaming, audio\n✶ Fashion Clothing, shoes, bags, accessories, traditional wear\n❐ Vehicles Cars, motorcycles, bikes, tricycles, parts\n■ Home & Furniture Sofas, beds, tables, appliances, decor\n✶ Health & Beauty Skincare, makeup, perfumes, hair products\n➖ Services Plumbers, electricians, tutors, photographers, etc.\n✶ Agriculture Plants, seeds, farm produce, tools\n■ Real Estate Land, houses, rentals, commercial spaces\n✶ Food & Beverage Fresh produce, packaged foods, catering\n✶ Books & Education Textbooks, novels, stationery\n✶ Music Instruments, DJ equipment, speakers\n⚽ Sports Gym equipment, sportswear, balls, gear\n✶ Baby & Kids Clothes, toys, strollers, baby equipment\n Business Office equipment, industrial tools, wholesale\n\nYou can browse categories from the homepage or use the search bar!"},

  {c:"buy", k:["price range","budget","affordable","cheap","within my budget","low price","under"],
   q:"How do I find items within my budget?", a:"To find items within your budget:\n\n1. Use the PRICE FILTER Select a range like 'Under ₦10,000' or '₦10,000-₦50,000'.\n2. SORT BY CHEAPEST This shows the most affordable items first.\n3. Search with price in mind e.g., 'laptop under 100000'.\n4. Browse categories where items tend to be cheaper like Used Electronics or Second-hand Fashion.\n5. Don't be afraid to negotiate! Most sellers accept reasonable offers.\n\nPro tip: Used items in good condition can save you 30-50% compared to buying new!"},

  {c:"buy", k:["condition","new or used","used items","new items","refurbished","second hand","like new","item condition"],
   q:"How do I know if an item is new or used?", a:"Each listing clearly shows the condition:\n\n✓ NEW Brand new, never used, often with original packaging\n✓ USED Previously owned, may have some wear\n✓ REFURBISHED Used but repaired/restored to working condition\n✓ LIKE NEW Used but barely shows any signs of use\n\nCheck the listing description for details about the item's age, usage history, and any defects. If unsure, always ask the seller directly: 'How old is this item?' or 'Has it been used before?'"},

  {c:"buy", k:["contact seller","message seller","talk to seller","reach seller","seller contact","seller phone number","how to contact"],
   q:"How do I contact the seller?", a:"Contacting the seller is straightforward:\n\n1. Open the item listing page.\n2. Scroll down to find the seller's contact information.\n3. You'll see their phone number you can CALL or send a WHATSAPP message.\n4. Some sellers also provide email addresses.\n\nWhen contacting, be polite and specific:\n• Introduce yourself\n• Mention the exact item (use the listing title)\n• Ask your questions clearly\n• Be ready to negotiate\n\nExample: 'Hello, I'm interested in your iPhone 12. Is it still available? Can we meet at [location] to check it?'"},

  {c:"buy", k:["negotiate","bargain","haggle","discount","reduce price","lower price","is price negotiable","can you reduce","price negotiation"],
   q:"Can I negotiate the price?", a:"YES! Negotiation is very common and expected on Kentai Marketplace (just like in any Nigerian market!). Here are tips:\n\n❑ Start politely: 'Is the price negotiable?' or 'Can you do your best price?'\n❐ Research first check similar listings to know the market price.\n♣ Be reasonable don't lowball too much, sellers may get offended.\n▲ Price slightly below what you're willing to pay (so you can meet in the middle).\n★ Mention if you're buying multiple items sellers often give bulk discounts.\n□ Offer quick payment 'I can pay immediately if you reduce the price.'\n\nMost sellers expect buyers to negotiate. It's part of the culture!"},

  {c:"buy", k:["delivery","shipping","home delivery","can you deliver","send to me","item delivery","delivery fee","delivery cost"],
   q:"How does delivery work?", a:"Delivery depends entirely on the seller:\n\n❐ SOME SELLERS offer home delivery (usually for an extra fee).\n♣ MANY SELLERS prefer you to pick up the item in person.\n❐ You can also use a logistics service (GIG Logistics, DHL, etc.) if the seller agrees.\n\nWhen you contact the seller, ask:\n• 'Do you offer delivery?'\n• 'How much is delivery to [your location]?'\n• 'Can we meet at [specific location] instead?'\n\nFor large items like furniture or vehicles, pickup is usually the best option. For smaller items like phones, delivery might be possible."},

  {c:"buy", k:["payment","how to pay","payment method","pay for item","payment options","how do i pay","ways to pay"],
   q:"What payment methods are available?", a:"Payment methods are agreed between you and the seller. Common options:\n\n● CASH Simplest and safest for in-person meetings.\n■ BANK TRANSFER Send money to seller's account. VERIFY the transfer before handing over the item.\n❐ MOBILE MONEY MTN MoMo, Airtel Money, etc. Confirm receipt on your phone.\n□ POS Some sellers have POS machines for card payments.\n\n⚠ SAFETY TIPS:\n• Never pay before seeing the item (unless you fully trust the seller).\n• For bank transfers, verify the transfer on YOUR banking app not just a screenshot from the seller.\n• Meet at a bank if doing large transfers you can verify instantly.\n• Always get a receipt or written acknowledgment."},

  {c:"buy", k:["safe buying","avoid scam","scam prevention","safe purchase","protect myself","stay safe buying","buyer safety"],
   q:"How do I stay safe when buying?", a:"Safety is very important! Here are essential tips:\n\n◆ MEET IN PUBLIC Shopping malls, police stations, bank parking lots, busy restaurants.\n✧ INSPECT THOROUGHLY Check every detail before paying. Turn on electronics, test all functions.\n✶ VERIFY PHOTOS Compare the actual item with listing photos.\n TRUST YOUR INSTINCTS If something feels wrong, walk away.\n✗ DON'T PAY IN ADVANCE Unless you fully trust the seller.\n♣ BRING A FRIEND Especially for expensive items.\n✎ CHECK DOCUMENTS For vehicles and real estate, verify all paperwork.\n⚠ RED FLAGS Too-good-to-be-true prices, reluctance to meet in person, pressure to pay immediately, stolen photos.\n\nIf you suspect a scam, report it using the Report button on the listing!"},

  {c:"buy", k:["meetup","meet seller","where to meet","pickup location","exchange location","meeting point","safe place to meet"],
   q:"Where should I meet the seller?", a:"Always meet in SAFE, PUBLIC, WELL-LIT locations:\n\n■ POLICE STATIONS Many have designated exchange areas. This is the SAFEST option.\n▶ SHOPPING MALLS Busy, well-lit, with security.\n■ BANK PARKING LOTS Safe and easy to verify bank transfers.\n☕ POPULAR CAFES/RESTAURANTS Public and comfortable.\n⛽ FUEL STATIONS Well-lit with security cameras.\n✶ WELL-LIT PUBLIC PARKS Only during daytime.\n\n✗ AVOID:\n• Private homes or apartments\n• Isolated or dark areas\n• Meeting at night\n• Accepting rides from strangers\n\nBring a friend if possible, and always inspect the item BEFORE paying!"},

  {c:"buy", k:["inspect item","check quality","verify item","test product","examine before buying","check item","how to check"],
   q:"How do I inspect an item before buying?", a:"Thorough inspection is crucial:\n\n❐ FOR ELECTRONICS (phones, laptops):\n• Turn it on and check it boots up properly\n• Test the screen (dead pixels, cracks, touch response)\n• Check all buttons, ports, cameras, speakers\n• Test WiFi, Bluetooth, GPS\n• Check battery health\n• Verify it's not iCloud/Google locked (for phones)\n• Check serial number against manufacturer database\n\n❐ FOR VEHICLES:\n• Get a mechanic to inspect it\n• Check engine, brakes, tires, body for accidents\n• Test drive it\n• Verify all documents (proof of ownership, customs, insurance)\n\n✶ FOR FASHION:\n• Check fabric quality, stitching, stains\n• Verify size and fit\n• Check for original brand markings\n\n■ FOR FURNITURE:\n• Check stability, material quality\n• Look for damage, scratches, pests (wood)\n• Test drawers, hinges, mechanisms\n\nAlways compare with listing photos and description!"},

  {c:"buy", k:["warranty","guarantee","product warranty","warranty period","is there warranty"],
   q:"Do items come with warranty?", a:"It depends on the item and seller:\n\n✶ NEW ITEMS May still have manufacturer warranty. Ask the seller for the receipt or warranty card to verify.\n↺ REFURBISHED Some sellers offer personal warranty (e.g., 30 days). Ask specifically.\n❐ USED ITEMS Typically NO warranty unless the seller offers one personally.\n\nAlways ask the seller:\n• 'Is there any warranty on this item?'\n• 'Can you provide the original receipt?'\n• 'How long is the warranty?'\n\nFor expensive items (cars, laptops), warranty is very important don't skip this question!"},

  {c:"buy", k:["return","refund","return item","got bad item","not as described","return policy","change my mind","i want my money back"],
   q:"Can I return an item?", a:"Return policies vary by seller since Kentai Marketplace connects individual buyers and sellers:\n\n✎ BEFORE BUYING Always ask: 'What is your return policy?' or 'Can I return this if there's an issue?'\n\n✓ ACCEPTABLE REASONS FOR RETURN:\n• Item doesn't match the description\n• Item is defective or broken\n• Seller misrepresented the condition\n\n✗ MAY NOT BE ACCEPTED:\n• Change of mind after buying\n• You didn't inspect properly before paying\n\n➤ TIPS:\n• Keep records of all communication\n• Take photos of the item when you receive it\n• Agree on return terms BEFORE paying\n• For disputes, click the WhatsApp button below to contact our admin"},

  {c:"buy", k:["popular items","trending","hot items","popular products","best sellers","what's popular","trending now"],
   q:"What are the most popular items?", a:"The most popular categories on Kentai Marketplace:\n\n❐ Smartphones iPhone, Samsung, Tecno, Infinix, Xiaomi\n Laptops Dell, HP, MacBook, Lenovo\n✶ Fashion Sneakers, bags, clothing, traditional wear\n❐ Vehicles Cars and motorcycles\n■ Home Appliances Fridges, generators, TVs, fans\n Electronics Accessories Earbuds, chargers, cases\n✶ Beauty Skincare, makeup, perfumes\n\nCheck the homepage for featured and premium listings to see what's currently trending. Popular items sell faster, so act quickly if you find a good deal!"},

  {c:"buy", k:["best deal","good deal","price comparison","best price","cheapest option","compare prices","where is the cheapest"],
   q:"How do I find the best deal?", a:"Finding the best deal takes a bit of research:\n\n1. SEARCH BROADLY Use different keywords to find similar items.\n2. COMPARE LISTINGS Look at multiple listings of the same item.\n3. CHECK CONDITION A slightly higher price for a better-condition item may be worth it.\n4. SORT BY CHEAPEST But verify quality isn't compromised.\n5. NEGOTIATE Most sellers accept reasonable offers.\n6. CHECK SELLER HISTORY Trusted sellers with stores are often more reliable.\n7. WATCH FOR PROMOTED LISTINGS These are from sellers investing in visibility, often indicating serious sellers.\n\n➤ Pro tip: The cheapest option isn't always the best deal. Consider condition, seller reliability, and what's included!"},

  {c:"buy", k:["bulk buy","buy in bulk","wholesale","multiple items","quantity discount","buy wholesale"],
   q:"Can I buy items in bulk?", a:"Yes! Some sellers offer bulk/wholesale options:\n\n❐ HOW TO FIND BULK SELLERS:\n• Search for 'wholesale' or 'bulk' in the search bar.\n• Look for sellers with multiple similar listings.\n• Check if the seller has a Store they're more likely to offer bulk.\n\n❑ WHEN CONTACTING:\n• Ask: 'Do you offer wholesale/bulk pricing?'\n• Mention the quantity you need.\n• Negotiate a per-unit discount.\n\nMany sellers are happy to offer discounts for bulk purchases. This is especially common for fashion items, electronics accessories, food products, and building materials."},

  {c:"buy", k:["gift","buy gift","gift ideas","present","birthday gift","christmas gift","anniversary gift"],
   q:"How do I buy a gift for someone?", a:"Buying gifts on Kentai Marketplace:\n\n✶ POPULAR GIFT CATEGORIES:\n• Electronics (phones, earbuds, smartwatches)\n• Fashion (bags, shoes, jewelry, watches)\n• Beauty (perfumes, skincare sets)\n• Home items (decorative pieces, small appliances)\n\n➤ TIPS:\n• Consider the recipient's interests and needs.\n• Check item quality through photos and descriptions.\n• Ask sellers if they offer gift wrapping.\n• Arrange delivery directly to the recipient if possible.\n• For last-minute gifts, buy from sellers in your area for quick pickup.\n\nNeed a specific gift idea? Ask me what to buy for a particular occasion!"},

  {c:"buy", k:["electronics","phone","laptop","computer","tablet","gadget","tech items","electronic items"],
   q:"What electronics are available?", a:"Kentai Marketplace has a huge range of electronics:\n\n❐ SMARTPHONES iPhone (all models), Samsung, Tecno, Infinix, Xiaomi, Nokia, etc.\n LAPTOPS Dell, HP, MacBook, Lenovo, Acer, ASUS, etc.\n DESKTOPS Full desktop computers, all-in-ones\n TVs Smart TVs, LED, OLED, all sizes\n AUDIO Speakers, headphones, earbuds, soundbars, DJ equipment\n✶ GAMING PlayStation, Xbox, Nintendo, gaming accessories\n CAMERAS DSLR, mirrorless, point-and-shoot, accessories\n⌚ WEARABLES Smartwatches, fitness trackers\n ACCESSORIES Chargers, cables, cases, screen protectors, power banks\n PRINTING Printers, scanners, ink cartridges\n\nWhen buying electronics, always test before paying and check for originality!"},

  {c:"buy", k:["fashion","clothes","shoes","bags","accessories","wear","outfit","clothing"],
   q:"What fashion items can I find?", a:"Fashion is one of our biggest categories:\n\n✶ MEN'S Shirts, trousers, suits, traditional wear (agbada, senator), shoes, watches\n✶ WOMEN'S Dresses, blouses, skirts, trousers, heels, bags, jewelry, ankara, george\n✶ KIDS Children's clothing, shoes, accessories\n✶ FOOTWEAR Sneakers, heels, sandals, boots, slippers, native shoes\n✶ BAGS Handbags, backpacks, laptop bags, clutches, wallets\n⌚ ACCESSORIES Watches, sunglasses, belts, ties, caps, hats\n✶ TRADITIONAL Ankara, aso-oke, george, lace, senator wear, iro and buba\n\nAlways check size, material, and condition. Ask sellers for measurements if buying online!"},

  {c:"buy", k:["vehicles","car","motorcycle","bike","bicycle","tricycle","keke","transportation"],
   q:"What vehicles are available?", a:"You can find various vehicles on the marketplace:\n\n❐ CARS Sedans, SUVs, hatchbacks, vans, pickups (new and used)\n❐ MOTORCYCLES Motorbikes, scooters, sport bikes\n❐ BICYCLES Regular bikes, mountain bikes, kids' bikes\n❐ TRICYCLES (KEKE) For commercial or personal use\n➖ VEHICLE PARTS Engines, tires, batteries, accessories\n\n⚠ IMPORTANT for vehicle purchases:\n• ALWAYS get a mechanic to inspect before buying.\n• Verify all documents: proof of ownership, customs papers, insurance.\n• Test drive the vehicle.\n• Use a lawyer for the transaction.\n• Transfer ownership properly after purchase.\n\nVehicles are high-value items take extra precautions!"},

  {c:"buy", k:["furniture","home items","sofa","bed","table","chair","apartment","home furniture","house furniture"],
   q:"Can I find furniture and home items?", a:"Yes! Home and furniture is a popular category:\n\n■ FURNITURE Sofas, couches, beds, mattresses, tables, chairs, wardrobes, cabinets\n✶ KITCHEN Appliances, cookware, utensils, cutlery\n➤ LIGHTING Lamps, chandeliers, LED lights, outdoor lighting\n■ DECOR Curtains, rugs, wall art, vases, mirrors\n✶ OUTDOOR Garden furniture, patio sets, plant pots\n➖ APPLIANCES Fridges, washing machines, TVs, generators, fans, ACs\n\n➤ Tips for buying furniture:\n• Check dimensions to ensure it fits your space.\n• Ask about material quality and condition.\n• Arrange transport/delivery for large items.\n• Inspect thoroughly upon delivery."},

  {c:"buy", k:["services","hire","need help","professional","service provider","hire a plumber","hire an electrician"],
   q:"Can I hire services?", a:"Yes! The Services section connects you with professionals:\n\n➖ HOME SERVICES Plumbers, electricians, carpenters, painters, cleaners\n✶ PERSONAL Hairdressers, barbers, makeup artists, tailors\n✶ CREATIVE Photographers, videographers, graphic designers\n✶ EDUCATION Tutors, teachers, music instructors\n TECH Web designers, app developers, IT support\n❐ AUTO Mechanics, auto electricians, vulcanizers\n❐ CONSTRUCTION Builders, surveyors, architects\n EVENTS Event planners, DJs, caterers, decorators\n\nCheck the seller's experience, portfolio, and reviews. Ask for references if it's a high-value service. Agree on pricing and timeline before work begins."},

  {c:"buy", k:["location","near me","close by","local","in my area","my city","items near me"],
   q:"How do I find items near me?", a:"Finding local items:\n\n1. Look at the LOCATION listed on each product listing.\n2. Use the search to filter by your city or state.\n3. Many sellers prefer local buyers for easy pickup.\n4. Contact sellers to confirm their exact location.\n5. Arrange a convenient meetup point between you.\n\nFor best results, include your city in searches: 'laptop Lagos' or 'car Abuja'. Local transactions are faster and safer since you can inspect items in person!"},

  {c:"buy", k:["saved","bookmark","save for later","wishlist","favorite","save item","later"],
   q:"Can I save items for later?", a:"While Kentai Marketplace doesn't have a built-in wishlist feature yet, here are workarounds:\n\n✶ BOOKMARK Save listing pages in your browser bookmarks.\n✶ SCREENSHOT Take screenshots of items you're interested in.\n✎ NOTES Write down listing details in your phone notes.\n➠ SHARE Send listing links to yourself via WhatsApp or email.\n\nWe're always improving the platform! For feature requests, click the WhatsApp button below to chat with our support team."},

  {c:"buy", k:["genuine","authentic","original","fake product","counterfeit","real product","is it original","how to verify"],
   q:"How do I know if a product is genuine?", a:"Verifying product authenticity:\n\n✧ PHYSICAL CHECKS:\n• Check brand markings, logos, and packaging quality\n• Compare with official product images online\n• Look for holograms, serial numbers, and authenticity stickers\n• Check build quality and materials\n\n❐ FOR ELECTRONICS:\n• Check serial number on manufacturer's website\n• Verify model number matches official specs\n• Check for official warranty\n\n⚠ RED FLAGS:\n• Price significantly below market value\n• Poor quality packaging or printing\n• Seller can't provide proof of purchase\n• Item looks 'too perfect' in photos\n\n♣ SAFEST OPTION: Meet in person, inspect thoroughly, and ask for original receipt or warranty card."},

  {c:"buy", k:["seller number","phone number","whatsapp","call seller","contact info","seller info"],
   q:"How do I get the seller's contact info?", a:"Seller contact info is on every listing:\n\n1. Open the item listing page.\n2. Scroll down past the photos and description.\n3. You'll see the seller's PHONE NUMBER.\n4. You can CALL directly or send a WHATSAPP message.\n5. Some listings also show email addresses.\n\n➤ When contacting, be professional:\n• Mention the item title\n• Ask if it's still available\n• Ask your questions clearly\n• Be ready to negotiate"},

  {c:"buy", k:["sold out","unavailable","item gone","not available","out of stock","can't find","item not there"],
   q:"What if the item I want is gone?", a:"If an item is no longer available:\n\n1. SEARCH AGAIN Try different keywords or broader terms.\n2. CHECK SIMILAR Browse the same category for alternatives.\n3. SAME SELLER Check if the seller has similar items listed.\n4. CONTACT SELLER Ask if they have similar items or can source what you need.\n5. SET REMINDERS Check back regularly as new items are listed daily.\n6. BROADEN SEARCH Consider different brands, models, or conditions.\n\nNew items are added to the marketplace every day, so keep checking!"},

  {c:"buy", k:["without account","guest","browse without login","guest user","without signing up","can i browse"],
   q:"Do I need an account to buy?", a:"You can BROWSE listings without an account. However, having an account gives you:\n\n✓ Save your preferences and settings\n✓ Access your purchase/browsing history\n✓ Build a reputation as a buyer\n✓ Create listings to sell items\n✓ Create and manage a Store\n✓ Access all platform features\n\nRegistration is FREE and takes less than 2 minutes. Click 'Sign Up' on the homepage to create your account!"},

  {c:"buy", k:["buy phone","buy iphone","buy samsung","buy android","smartphone","buy a phone","phone shopping"],
   q:"How do I buy a phone?", a:"Buying a phone step by step:\n\n1. SEARCH 'iPhone 13' or 'Samsung A52' or just 'phones'.\n2. COMPARE Check multiple listings for price, condition, and location.\n3. CHECK PHOTOS Look for scratches, screen condition, accessories included.\n4. CONTACT SELLER Ask important questions:\n   • 'Is it iCloud/Google locked?' (for iPhones/Android)\n   • 'What's the battery health?'\n   • 'Does it come with charger and box?'\n   • 'Is there any warranty?'\n   • 'Has it been repaired?'\n5. MEET & TEST Turn it on, check all functions, test camera, WiFi, calls.\n6. VERIFY Check IMEI number on the manufacturer's website.\n7. PAY Only after you're satisfied with the phone's condition.\n\nNever buy a phone you haven't tested first!"},

  {c:"buy", k:["buy laptop","buy computer","buy macbook","buy pc","notebook","buy a laptop"],
   q:"How do I buy a laptop?", a:"Buying a laptop step by step:\n\n1. KNOW YOUR NEEDS Student, gaming, business, or general use?\n2. SEARCH Filter by brand, RAM, storage, and price range.\n3. CHECK SPECS Processor, RAM (min 8GB recommended), Storage, Graphics, Screen size.\n4. CONTACT SELLER Ask:\n   • 'What's the battery life?'\n   • 'Has it been repaired or upgraded?'\n   • 'Does it come with charger and box?'\n   • 'What's the RAM and storage?'\n5. TEST BEFORE BUYING:\n   • Check screen for dead pixels\n   • Test keyboard, trackpad, all ports\n   • Test WiFi, sound, camera\n   • Check if it boots up properly\n   • Run a quick benchmark if possible\n6. VERIFY Check serial number with manufacturer.\n7. PAY Only after thorough testing."},

  {c:"buy", k:["buy car","buy vehicle","buy automobile","purchase car","car shopping","buying a car"],
   q:"How do I safely buy a car?", a:"Buying a car requires EXTRA CAUTION:\n\n➖ STEP 1 GET A MECHANIC to inspect the vehicle thoroughly.\n✎ STEP 2 VERIFY ALL DOCUMENTS:\n   • Proof of ownership\n   • Customs papers (for imported vehicles)\n   • Insurance\n   • Vehicle papers (license, registration)\n\n❐ STEP 3 PHYSICAL INSPECTION:\n   • Check engine condition\n   • Check body for accident damage\n   • Test drive on different roads\n   • Check tires, brakes, lights\n   • Check AC, audio, electronics\n\n○ STEP 4 VERIFY SELLER IDENTITY:\n   • Confirm they're the actual owner\n   • Check their ID\n\n⚖ STEP 5 USE A LAWYER for the transaction.\n✎ STEP 6 TRANSFER OWNERSHIP properly after purchase.\n\nThis is a high-value transaction don't rush it!"},

  {c:"buy", k:["buy clothes","buy shoes","buy bag","fashion items","buy outfit","buy wear","clothing size"],
   q:"How do I choose the right size when buying clothes?", a:"Getting the right size when buying online:\n\n1. ASK FOR MEASUREMENTS 'Can you provide chest, waist, and length measurements?'\n2. COMPARE Match with clothes you already own that fit well.\n3. ASK FOR PHOTOS Request a photo with a measuring tape for reference.\n4. FOR SHOES Ask for the insole length in cm.\n5. CHECK BRAND SIZING Different brands have different size charts.\n6. ASK ABOUT EXCHANGES 'If the size doesn't fit, can I exchange?'\n\n➤ Pro tip: Nigerian sellers often use UK/EU sizing. Always confirm the sizing system and get exact measurements!"},

  {c:"buy", k:["buy furniture","buy sofa","buy bed","buy table","furniture shopping"],
   q:"How do I buy furniture?", a:"Buying furniture tips:\n\n1. MEASURE YOUR SPACE Know the dimensions of the area where it will go.\n2. CHECK LISTING DIMENSIONS Height, width, depth should be in the listing.\n3. ASK ABOUT MATERIAL Wood type, fabric quality, metal finish.\n4. REQUEST EXTRA PHOTOS Close-ups of joints, fabric texture, any wear.\n5. ARRANGE TRANSPORT Large items need delivery or you need to hire transport.\n6. INSPECT ON DELIVERY Check thoroughly before the delivery person leaves.\n7. ASK ABOUT DISASSEMBLY Can it be taken apart for easier transport?\n\n➤ For used furniture, check for pests (wood furniture), mold, and structural stability."},

  {c:"buy", k:["buy appliance","buy fridge","buy tv","buy generator","buy washing machine","buy freezer","home appliance"],
   q:"Can I buy home appliances?", a:"Yes! Home appliances are widely available:\n\n✶ REFRIGERATORS New and used, various sizes\n✶ WASHING MACHINES Top load, front load\n TVs All sizes and brands\n GENERATORS Petrol, diesel, inverter\n✶ FANS & ACs Standing fans, ceiling fans, air conditioners\n✶ MICROWAVES Various brands and sizes\n OTHER Blenders, irons, rice cookers, water dispensers\n\nWhen buying used appliances:\n• Ask about age and usage history\n• Test them when meeting the seller\n• Check for any unusual noises\n• Verify all functions work\n• Ask if original accessories are included"},

  {c:"buy", k:["buy land","buy property","real estate","house","rental","buy house","property","land for sale"],
   q:"Can I find real estate?", a:"Yes! The Real Estate section has:\n\n■ LAND Plots, acres, commercial land\n■ HOUSES For sale and for rent\n■ COMMERCIAL Office spaces, shops, warehouses\n\n⚠ EXTREMELY IMPORTANT for real estate:\n1. VERIFY ALL DOCUMENTS Certificate of Occupancy (C of O), survey plan, deed of assignment\n2. VISIT THE PROPERTY Physically inspect the land/house\n3. USE A LAWYER Never skip this step\n4. CONFIRM SELLER IDENTITY Verify they actually own the property\n5. CHECK WITH GOVERNMENT Confirm the land isn't under government acquisition\n6. NEVER PAY WITHOUT PROPER DOCUMENTATION\n\nReal estate scams are common in Nigeria. Be extremely careful and always use professionals."},

  {c:"buy", k:["buy food","groceries","food items","cooking","restaurant","buy food items","food vendor"],
   q:"Can I buy food items?", a:"Yes! Food-related listings include:\n\n✶ FRESH PRODUCE Vegetables, fruits, grains (direct from farmers)\n❐ PACKAGED FOODS Snacks, beverages, canned goods\n✶ BULK SUPPLIES Rice, beans, garri, palm oil in large quantities\n✶ CATERING Restaurant services, event catering\n✶ BAKED GOODS Cakes, pastries, bread\n✶ LOCAL DELICACIES Traditional foods, spices\n\n➤ Tips:\n• Check seller's location for freshness (especially perishables)\n• Ask about delivery options for food items\n• For bulk food, negotiate prices\n• Verify food safety and storage conditions"},

  {c:"buy", k:["buy baby","baby items","kids","children","toys","baby products","children items","kids stuff"],
   q:"What baby and children items are available?", a:"Baby and children items on the marketplace:\n\n✶ BABY CLOTHES Onesies, rompers, shoes, accessories\n✶ FEEDING Bottles, formula, baby food\n✶ STROLLERS & PRAMS Various brands and conditions\n✶ TOYS Educational toys, dolls, cars, puzzles\n✶ SCHOOL SUPPLIES Books, bags, uniforms, stationery\n■ BABY CARE Diapers, wipes, bath products\n♻ SECOND-HAND Many parents sell gently used baby items at great prices\n\n➤ Buying second-hand baby items is very common and practical babies outgrow things quickly! Just check condition and cleanliness."},

  {c:"buy", k:["buy sports","gym equipment","fitness","sporting goods","exercise","buy sports equipment","gym"],
   q:"Can I buy sports and fitness equipment?", a:"Yes! Sports and fitness items available:\n\n✶ GYM EQUIPMENT Weights, dumbbells, treadmills, yoga mats, resistance bands\n⚽ SPORTS BALLS Footballs, basketballs, volleyballs, tennis balls\n✶ RACKETS Tennis, badminton, squash\n❐ CYCLING Bikes, helmets, accessories\n✶ SWIMMING Goggles, caps, swimsuits\n✶ SPORTSWEAR Jerseys, shorts, running shoes, tracksuits\n✶ MARTIAL ARTS Gloves, punching bags, protective gear\n\nCheck condition carefully for used gym equipment, especially items that bear weight. Test stability before buying."},

  {c:"buy", k:["buy books","education","school","learning","textbook","buy books","academic"],
   q:"Can I buy books and educational materials?", a:"Yes! Books and educational items:\n\n✶ TEXTBOOKS Primary, secondary, university level\n✶ NOVELS & FICTION Nigerian and international authors\n PROFESSIONAL Law, medicine, engineering, business books\n✎ STATIONERY Notebooks, pens, calculators, art supplies\n✶ EXAM PREP WAEC, JAMB, NECO past questions\n\n➤ Tips:\n• Search by subject, author, or course code\n• Many students sell used textbooks at 30-60% of retail price\n• Check for highlights, notes, or damage\n• Ask for ISBN if you need a specific edition\n• Group buying ask if sellers have bundles of related books"},

  {c:"buy", k:["buy music","instruments","guitar","piano","audio equipment","musical instruments","dj"],
   q:"Can I buy musical instruments?", a:"Yes! Musical instruments available:\n\n✶ GUITARS Acoustic, electric, bass\n✶ KEYBOARDS & PIANOS Digital and acoustic\n✶ DRUMS Full sets, electronic drums, percussion\n✶ STRINGS Violins, cellos, ukuleles\n✶ WIND Flutes, saxophones, trumpets\n DJ EQUIPMENT Turntables, mixers, controllers\n❐ AUDIO Speakers, amplifiers, microphones\n\n➤ Tips:\n• Ask seller to demonstrate the instrument works\n• Check for any damage or missing parts\n• Ask about age and maintenance history\n• For expensive instruments, meet in person to test\n• Ask if accessories are included (cases, straps, cables)"},

  {c:"buy", k:["buy pet","pets","animals","dog","cat","bird","buy pets","pet shop"],
   q:"Can I buy pets?", a:"Yes, pet listings are available, but please be responsible:\n\n✶ DOGS Various breeds\n✶ CATS Different breeds\n✶ BIRDS Parrots, canaries, etc.\n✶ FISH Aquarium fish\n\n⚠ IMPORTANT:\n1. Ensure animals are treated well and healthy\n2. Check vaccination records\n3. Make sure you have proper space and resources\n4. Comply with local pet ownership regulations\n5. Meet in person to see the animal's condition\n6. Ask about diet, age, and temperament\n\n➤ Consider adopting from shelters too many wonderful pets need homes!"},

  {c:"buy", k:["buy tools","construction","building","hand tools","power tools","buy tools","building materials"],
   q:"Can I buy construction and building tools?", a:"Yes! Construction and building items:\n\n➖ HAND TOOLS Hammers, wrenches, pliers, screwdrivers, saws\n POWER TOOLS Drills, grinders, circular saws, sanders\n✶ SAFETY Helmets, gloves, boots, goggles\n❐ MATERIALS Cement, iron rods, roofing sheets, tiles\n✶ FASTENERS Nails, screws, bolts, adhesives\n MEASURING Tape measures, levels, squares\n\n➤ Tips:\n• Check tool condition and brand authenticity\n• For power tools, test before buying\n• Ask about voltage compatibility (220V vs 110V)\n• Check if accessories/attachments are included\n• For building materials, verify quantity and quality"},

  {c:"buy", k:["buy beauty","skincare","makeup","cosmetics","hair products","beauty products","perfume"],
   q:"What beauty and health products are available?", a:"Beauty and health products:\n\n✶ MAKEUP Foundation, lipstick, eyeshadow, mascara\n✶ SKINCARE Cleansers, moisturizers, serums, sunscreens\n✶ HAIR Shampoos, conditioners, treatments, wigs, weaves\n✶ PERFUMES Designer and local fragrances\n SUPPLEMENTS Vitamins, health supplements\n DENTAL Toothbrushes, toothpaste, whitening products\n✶ BEAUTY TOOLS Brushes, sponges, hair dryers, straighteners\n\n⚠ BE CAREFUL with beauty products:\n• Ask about product origin and authenticity\n• Check packaging and expiry dates\n• Counterfeit beauty products are common\n• Ask sellers for proof of purchase\n• When in doubt, buy from authorized retailers"},

  {c:"buy", k:["buy watch","jewelry","accessories","necklace","ring","jewelry","buy jewelry","wristwatch"],
   q:"Can I buy jewelry and accessories?", a:"Yes! Jewelry and accessories:\n\n⌚ WATCHES Wristwatches (Casio, Rolex, Hublot, local brands), smartwatches\n✶ RINGS Gold, silver, diamond, costume jewelry\n✶ NECKLACES Chains, pendants, beaded necklaces\n✶ BRACELETS Bangles, charm bracelets, beaded\n EARRINGS Studs, hoops, dangling\n✶ SUNGLASSES Designer and fashion\n✶ MEN'S Ties, cufflinks, belts, wallets\n\n➤ Tips:\n• For expensive items, verify authenticity\n• Ask about materials (gold karat, silver purity)\n• Check for hallmarks and certifications\n• Meet in person to inspect quality\n• Ask for original packaging and certificates"},

  {c:"buy", k:["buy plant","garden","flowers","agriculture","farming","plants","seedlings","farm produce"],
   q:"Can I buy plants and agricultural products?", a:"Yes! Agriculture section:\n\n✶ PLANTS Seedlings, ornamental plants, indoor plants\n✶ FLOWERS Bouquets, garden flowers, dried flowers\n✶ FARM PRODUCE Fresh vegetables, fruits, grains\n✶ SEEDS Vegetable seeds, flower seeds, tree seeds\n✶ FERTILIZERS Organic and chemical\n➖ FARM TOOLS Hoes, cutlasses, watering cans, sprayers\n❐ EQUIPMENT Small tractors, harvesters, processing machines\n\n➤ Many farmers sell directly on the platform great for fresh, authentic products! Check seller location for freshness."},

  {c:"buy", k:["buy software","digital","download","digital product","software","ebook","online course","template"],
   q:"Can I buy digital products?", a:"Yes! Digital products available:\n\n SOFTWARE Licenses, applications, tools\n✶ E-BOOKS Digital books, guides, manuals\n✶ DESIGNS Logos, flyers, business cards, social media templates\n✶ TEMPLATES CV/resume templates, invoice templates, presentation templates\n✶ ONLINE COURSES Skill-building courses, tutorials\n✶ MUSIC Beats, sound effects, samples\n❐ APPS Mobile app templates, website templates\n\n⚠ Tips:\n• Verify seller credibility before buying\n• Ensure you receive the product immediately after payment\n• Check usage rights and licensing terms\n• Ask for samples or previews when possible\n• Keep records of your digital purchases"},

  {c:"buy", k:["buy event","tickets","concert","party","event supplies","event items","decoration","party supplies"],
   q:"Can I buy event-related items?", a:"Yes! Event items and services:\n\n✶ PARTY SUPPLIES Balloons, banners, table covers, plates, cups\n✶ DECORATIONS Flowers, drapes, lighting, centerpieces\n■ RENTALS Chairs, tables, canopies, tents\n❐ SOUND PA systems, microphones, speakers\n➤ LIGHTING Stage lights, LED strips, projectors\n✶ CATERING Food, drinks, cakes, custom orders\n✶ SERVICES Photographers, videographers, MCs, DJs\n✶ EQUIPMENT Tents, stages, dance floors\n\n➤ Tips:\n• Book early for popular dates\n• Ask about package deals (decoration + catering + sound)\n• Confirm delivery and setup is included\n• Check availability for your specific date\n• Ask for portfolio/photos of past events"},

  {c:"buy", k:["buy wedding","bridal","engagement","wedding dress","wedding items","wedding planning"],
   q:"Can I find wedding-related items?", a:"Yes! Wedding items and services:\n\n✶ DRESSES Wedding gowns (new and pre-loved at great discounts!)\n✶ ACCESSORIES Bridal shoes, veils, tiaras, jewelry\n✶ DECORATIONS Venue decoration, flower arrangements\n✶ PHOTOGRAPHY Wedding photographers and videographers\n✶ CAKES Wedding cakes and desserts\n✶ CATERING Food and drinks for guests\n✶ INVITATIONS Custom wedding invitations\n✶ MUSIC DJs, live bands, sound systems\n\n➤ Pre-loved wedding dresses are popular brides sell their gently-used dresses at 50-70% discount! Check condition carefully."},

/* ============================================================
   SECTION 3: SELLING COMPLETE  (61-130)
   ============================================================ */
  {c:"sell", k:["how to sell","sell item","list item","post item","sell something","sell on kentai","i want to sell"],
   q:"How do I sell an item?", a:"Selling on Kentai Marketplace is FREE and simple:\n\n1. CLICK 'SELL' The orange 'Sell' button is on every page (top navigation).\n2. FILL IN DETAILS:\n   • Item title (be specific and descriptive)\n   • Detailed description (condition, specs, what's included)\n   • Price (research similar listings first)\n   • Category (choose the right one)\n   • Condition (New / Used / Refurbished)\n   • Your location\n3. UPLOAD PHOTOS At least 3-5 clear photos from different angles.\n4. ADD CONTACT Your phone number so buyers can reach you.\n5. SUBMIT Your listing goes live immediately!\n\nThat's it! Buyers will contact you via phone or WhatsApp."},

  {c:"sell", k:["create listing","new listing","post listing","add listing","upload item","make a listing","how to list"],
   q:"How do I create a listing?", a:"Creating a listing step by step:\n\n1. Go to the 'Sell' page (promote.html) or click the 'Sell' button.\n2. Fill in ALL required fields:\n   • TITLE Be specific: 'iPhone 13 Pro 256GB Space Grey' not just 'Phone'\n   • DESCRIPTION Include brand, model, condition, age, defects, what's included\n   • PRICE Research similar listings, price competitively\n   • CATEGORY Choose the most relevant category\n   • CONDITION New, Used, or Refurbished\n   • LOCATION Your city/area\n3. UPLOAD PHOTOS Minimum 3, maximum as many as you want. Show all angles.\n4. ADD PHONE NUMBER So buyers can contact you.\n5. REVIEW Check everything is correct.\n6. SUBMIT Your listing is live!\n\n➤ Pro tip: Good titles and descriptions help your listing appear in more searches!"},

  {c:"sell", k:["listing fees","cost to sell","free listing","how much to sell","listing price","is it free","sell for free"],
   q:"Is it free to list items?", a:"YES! Basic listings are 100% FREE:\n\n✓ Free to create unlimited listings\n✓ Free to browse and buy\n✓ Free to create a Store\n✓ No commission on sales\n✓ No hidden fees\n\nThe only optional paid feature is PROMOTED LISTINGS, which give your item extra visibility (featured on homepage, higher in search results). But basic selling is completely free!"},

  {c:"sell", k:["promoted","premium listing","boost","featured","increase visibility","promote my item","paid listing"],
   q:"What are promoted listings?", a:"Promoted listings give your item extra visibility:\n\n BENEFITS:\n• Featured placement on the homepage\n• Higher ranking in search results\n• Longer listing duration\n• More potential buyers see your item\n• 'Premium' badge on your listing\n\n❐ RESULTS:\n• Promoted listings typically get 3-5x more views\n• More inquiries and faster sales\n• Better for high-value or competitive items\n\n● HOW TO PROMOTE:\n• Go to the 'Promote' page (promote.html)\n• Select your listing\n• Choose duration and type\n• Complete payment\n\nConsider promoting items that are competitive or high-value!"},

  {c:"sell", k:["good photos","product photos","item pictures","photo tips","listing photos","how to take photos","photography"],
   q:"How do I take good product photos?", a:"Great photos are the #1 factor in making sales!\n\n✶ PHOTO TIPS:\n1. NATURAL LIGHT Shoot near a window or outdoors (not in dark rooms)\n2. CLEAN THE ITEM Wipe dust, remove fingerprints\n3. MULTIPLE ANGLES Front, back, sides, top, bottom\n4. PLAIN BACKGROUND White wall, clean table, or neutral surface\n5. SHOW DEFECTS HONESTLY Close-up of any scratches or damage\n6. SHOW SCALE Place a coin or ruler next to small items\n7. SHOW IT IN USE If applicable (phone being held, bag being worn)\n8. INCLUDE ACCESSORIES Show everything that comes with the item\n9. HIGH RESOLUTION Clear, not blurry (but within file size limits)\n10. GOOD COMPOSITION Item centered, well-framed\n\n➤ Pro tip: Listings with 5+ good photos get significantly more inquiries!"},

  {c:"sell", k:["description","item description","write listing","listing text","product description","what to write","listing content"],
   q:"How should I write my listing description?", a:"A great description sells the item:\n\n✎ INCLUDE:\n• Full item name and brand\n• Model number (for electronics)\n• Condition (New/Used/Refurbished + details)\n• Age or purchase date\n• Key specifications (size, color, RAM, storage, etc.)\n• Any defects or issues (BE HONEST builds trust)\n• What's included (box, charger, accessories, manual)\n• Reason for selling (optional, but builds trust)\n• Your location\n• Preferred contact method\n\n✎ EXAMPLE:\n'iPhone 12 Pro 256GB Pacific Blue\nPurchased March 2022, excellent condition.\nBattery health: 89%\nNo scratches on screen (always had screen protector)\nMinor scratch on the back (see photo 4)\nComes with original box, charger, and cable.\nSelling because I upgraded to iPhone 14.\nLocation: Lagos (Ikeja)\nContact: 08012345678 (WhatsApp preferred)'"},

  {c:"sell", k:["price item","set price","pricing strategy","how much to charge","price tips","what price","how to price","pricing"],
   q:"How do I set the right price?", a:"Setting the right price is crucial:\n\n❐ RESEARCH FIRST:\n• Search for similar items on Kentai Marketplace\n• Check what others are charging for the same item\n• Note the price range (lowest to highest)\n\n➤ PRICING STRATEGIES:\n• Price slightly ABOVE your minimum (leave room for negotiation)\n• For used items in good condition: 50-70% of original retail price\n• For like-new items: 70-85% of retail\n• For items with defects: 30-50% of retail\n• Factor in what's included (accessories add value)\n\n⚠ DON'T:\n• Overprice buyers will ignore your listing\n• Underprice you'll lose money and attract suspicious buyers\n• Price without research you'll miss the market\n\n❑ Add 'Price negotiable' if you're flexible!"},

  {c:"sell", k:["sell fast","sell quickly","quick sale","fast selling","sell immediately","sell today","urgent sale"],
   q:"How can I sell my item quickly?", a:"Tips for fast sales:\n\n1. PRICE COMPETITIVELY Research and price slightly below similar listings.\n2. GREAT PHOTOS Multiple clear, well-lit photos from all angles.\n3. DETAILED DESCRIPTION Honest and thorough.\n4. BE RESPONSIVE Reply to buyer messages within minutes, not hours.\n5. BE FLEXIBLE Accept reasonable offers, don't be too rigid on price.\n6. LIST AT PEAK TIMES Morning (7-9 AM), lunch (12-2 PM), evening (6-9 PM).\n7. PROMOTE YOUR LISTING Get more visibility.\n8. SHARE ON SOCIAL MEDIA WhatsApp status, Facebook, Instagram.\n9. REFRESH PERIODICALLY Edit the listing to bump it in search results.\n10. BE AVAILABLE FOR QUICK MEETUPS Buyers love sellers who can meet soon.\n\n➤ The #1 reason items don't sell fast is overpricing. Check your competition!"},

  {c:"sell", k:["edit listing","update listing","change listing","modify listing","fix listing","change price","update my listing"],
   q:"How do I edit my listing?", a:"Editing your listing is easy:\n\n1. Go to 'My Listings' (click 'My List' in navigation).\n2. Find the listing you want to edit.\n3. Click the EDIT button on that listing.\n4. Update any field:\n   • Change the price\n   • Update the description\n   • Add or remove photos\n   • Change the category or condition\n   • Update your location\n5. SAVE Changes are live immediately.\n\n➤ Pro tip: If your item isn't getting views, try editing the title and description with better keywords, or lower the price slightly."},

  {c:"sell", k:["delete listing","remove listing","take down","unpublish","cancel listing","remove my listing","delete my item"],
   q:"How do I remove a listing?", a:"Removing a listing:\n\n1. Go to 'My Listings' page.\n2. Find the listing you want to remove.\n3. Click the DELETE/REMOVE button.\n4. Confirm the deletion.\n\nOnce deleted, the listing is no longer visible to buyers. You can always create a new listing for the same item later if needed."},

  {c:"sell", k:["mark as sold","item sold","sold item","i sold it","mark sold","sold out"],
   q:"How do I mark an item as sold?", a:"When your item sells:\n\n1. Go to 'My Listings'.\n2. Find the sold item.\n3. Delete or edit the listing to indicate it's sold.\n4. You can also edit the title to add '[SOLD]' before deleting.\n\nThis helps other buyers know the item is no longer available and keeps your active listings organized."},

  {c:"sell", k:["sell phone","sell iphone","sell samsung","sell used phone","sell android","sell my phone","selling a phone"],
   q:"How do I sell my phone?", a:"Selling a phone complete guide:\n\n✎ BEFORE LISTING:\n1. BACK UP your data (contacts, photos, messages)\n2. FACTORY RESET the phone remove ALL personal data\n3. LOG OUT of all accounts (iCloud, Google, Samsung)\n4. CLEAN the phone remove screen protector if damaged, clean thoroughly\n5. GATHER ACCESSORIES charger, cable, box, manual (if you have them)\n\n✶ TAKING PHOTOS:\n• Front (screen on and off)\n• Back\n• Sides\n• Any scratches or damage\n• Accessories included\n• Box (if available)\n\n✎ WRITING THE LISTING:\n• Model, storage capacity, RAM\n• Condition (scratches, battery health)\n• Whether it's iCloud/Google locked (MUST be unlocked!)\n• What's included\n• Your location and contact\n\n● PRICING:\n• Check what similar phones are listed for\n• iPhone: 60-75% of current retail for good condition\n• Android: 50-65% of current retail for good condition\n\n⚠ NEVER sell a locked phone without disclosing it!"},

  {c:"sell", k:["sell laptop","sell computer","sell macbook","sell pc","sell my laptop","selling laptop"],
   q:"How do I sell a laptop?", a:"Selling a laptop:\n\n✎ PREPARATION:\n1. Back up all your data\n2. Wipe the hard drive / factory reset\n3. Clean the laptop (screen, keyboard, ports)\n4. Gather charger, box, and any accessories\n\n✶ PHOTOS:\n• Screen (on and off)\n• Keyboard\n• All sides and ports\n• Any damage or wear\n• Charger and box\n\n✎ LISTING DETAILS:\n• Brand and model\n• Processor (e.g., Intel i5, AMD Ryzen 5)\n• RAM (e.g., 8GB, 16GB)\n• Storage (e.g., 256GB SSD, 1TB HDD)\n• Graphics card\n• Screen size\n• Battery health\n• Operating system\n• Condition and any issues\n\n● PRICING: 40-60% of current retail for used, 60-80% for like-new."},

  {c:"sell", k:["sell car","sell vehicle","sell motorcycle","vehicle listing","sell my car","selling a car"],
   q:"How do I sell a vehicle?", a:"Selling a vehicle:\n\n✶ PHOTOS (take many):\n• Exterior from all 4 angles\n• Interior (seats, dashboard, steering)\n• Engine bay\n• Trunk/boot\n• Tires\n• Any damage or scratches\n• Odometer reading\n\n✎ LISTING DETAILS:\n• Make, model, year\n• Mileage (km)\n• Fuel type (petrol/diesel)\n• Transmission (manual/automatic)\n• Color\n• Features (AC, power steering, etc.)\n• Known issues or recent repairs\n• Document status (proof of ownership, customs, insurance)\n\n✎ PREPARATION:\n• Wash the vehicle thoroughly\n• Fix minor issues (bulbs, wipers)\n• Gather all documents\n• Set a realistic price based on market value\n\n⚠ SAFETY: Meet with a trusted person, verify buyer's identity, confirm payment before handing over keys and documents."},

  {c:"sell", k:["sell clothes","sell fashion","sell shoes","sell bag","sell my clothes","selling clothes","fashion listing"],
   q:"How do I sell fashion items?", a:"Selling fashion items:\n\n✶ PHOTOS:\n• Item on a hanger or laid flat (clean background)\n• If possible, show it being worn\n• Close-up of brand labels/tags\n• Close-up of fabric texture\n• Soles (for shoes)\n• Any stains, tears, or defects\n\n✎ DESCRIPTION:\n• Brand name\n• Size (use standard sizing: S, M, L, XL or measurements)\n• Color\n• Material/fabric type\n• Condition (new with tags, gently used, etc.)\n• Original price (shows the discount)\n• Reason for selling\n\n➤ TIPS:\n• Wash/iron clothes before photographing\n• Show the item in good lighting\n• Be honest about any defects\n• Mention if it's authentic/original\n• For shoes, include the sole condition"},

  {c:"sell", k:["sell furniture","sell sofa","sell bed","furniture listing","sell my furniture","selling furniture"],
   q:"How do I sell furniture?", a:"Selling furniture:\n\n✶ PHOTOS:\n• Full piece in a room setting\n• Close-ups of material/texture\n• Any damage or wear spots\n• Dimensions (use a tape measure in photos)\n\n✎ DESCRIPTION:\n• Type of furniture\n• Dimensions (H x W x D in cm)\n• Material (wood type, fabric, metal)\n• Color\n• Age\n• Condition and any defects\n• Whether it needs disassembly for transport\n• If delivery is available (and cost)\n\n➤ TIPS:\n• Clean furniture before photographing\n• Mention if it's solid wood or MDF/particle board\n• State if it comes from a known brand\n• For upholstered items, mention fabric type and any stains\n• Price: 30-50% of original for used furniture in good condition"},

  {c:"sell", k:["sell food","food vendor","catering","food business","sell food items","food listing"],
   q:"Can I sell food on the marketplace?", a:"Yes! Food selling is popular:\n\n✶ WHAT YOU CAN SELL:\n• Fresh produce (fruits, vegetables)\n• Packaged foods\n• Catering services\n• Baked goods\n• Local delicacies\n• Bulk food supplies\n\n✎ FOR FOOD LISTINGS:\n• Clear photos of the food\n• Pricing (per unit, per kg, per portion)\n• Delivery areas\n• Minimum order quantity\n• Food safety certifications (if any)\n• Contact and availability\n\n⚠ IMPORTANT:\n• Ensure food safety and hygiene\n• Mention expiry dates for packaged items\n• Be clear about delivery timing\n• For catering, include menu options and pricing\n• Consider offering samples for first-time buyers"},

  {c:"sell", k:["sell services","offer service","hire me","service provider","professional services","sell my service","offering services"],
   q:"How do I sell my services?", a:"Selling services on Kentai Marketplace:\n\n✎ CREATE A SERVICE LISTING:\n• Title: Be specific 'Professional Plumbing Services in Lagos'\n• Description: Detail your experience, qualifications, what you offer\n• Pricing: Hourly rate, per-job rate, or starting price\n• Portfolio: Photos of past work (before/after)\n• Availability: Days and hours you're available\n• Location: Areas you serve\n• Contact: Phone/WhatsApp\n\n➖ SERVICES YOU CAN LIST:\n• Plumbing, electrical, carpentry\n• Hairdressing, makeup, tailoring\n• Tutoring, music lessons\n• Photography, videography\n• Web design, graphic design\n• Cleaning, fumigation\n• Event planning, catering\n• Auto repair, vulcanizing\n\n➤ Tips:\n• Build a portfolio of past work\n• Offer competitive starting prices\n• Respond quickly to inquiries\n• Ask satisfied clients for referrals\n• Consider creating a Store for your service business"},

  {c:"sell", k:["multiple items","sell many","bulk selling","many listings","multiple listings","sell lots","many products"],
   q:"Can I list multiple items?", a:"Yes! You can create as many listings as you want:\n\n✓ No limit on number of listings\n✓ Each listing is independent\n✓ Can be in different categories\n✓ Each can have its own price and description\n\n➤ TIPS FOR MULTIPLE LISTINGS:\n• Give each item a unique, descriptive title\n• Use different photos for each listing\n• Price each item individually\n• Consider creating a Store if you have many items it organizes everything under one professional page\n• Cross-reference in descriptions: 'See my other listings for more items'\n\nHaving more listings increases your visibility and chances of sales!"},

  {c:"sell", k:["shipping","deliver","send item","post item","item delivery","how to ship","delivery to buyer"],
   q:"How do I handle delivery for sold items?", a:"Delivery options for sellers:\n\n❐ OPTIONS:\n1. PICKUP Buyer comes to you (safest, no cost)\n2. SELF-DELIVERY You deliver personally (good for small items nearby)\n3. LOGISTICS SERVICE Use GIG Logistics, DHL, etc. (for distant buyers)\n4. THIRD-PARTY DELIVERY Hire a bike rider or transporter\n\n● WHO PAYS:\n• You decide include delivery cost in price, or charge separately\n• Clearly state in your listing: 'Delivery available at extra cost' or 'Pickup only'\n\n⚠ SAFETY:\n• ALWAYS get payment BEFORE shipping\n• For logistics, get tracking number\n• Package fragile items carefully\n• Keep proof of shipment\n• For high-value items, consider insurance"},

  {c:"sell", k:["scam seller","fake buyer","avoid scam","seller protection","stay safe selling","buyer scam"],
   q:"How do I stay safe as a seller?", a:"Seller safety tips:\n\n◆ MEETING SAFETY:\n• Meet in safe, public locations\n• For high-value items, meet at a bank or police station\n• Bring a friend or trusted person\n• Don't go to unknown locations\n\n● PAYMENT SAFETY:\n• Accept payment BEFORE handing over the item\n• For bank transfers, verify on YOUR banking app (not seller's screenshot)\n• Cash is safest for in-person deals\n• Be wary of buyers offering ABOVE your asking price\n\n⚠ RED FLAGS:\n• Buyer wants to pay later\n• Buyer sends fake payment alerts\n• Buyer insists on meeting at isolated location\n• Buyer offers to pay more than asking price\n• Buyer rushes you to hand over item quickly\n• Buyer sends suspicious links\n\n❐ If something feels wrong, trust your instincts and walk away!"},

  {c:"sell", k:["payment received","get paid","receive payment","payment confirmation","money received","how to get paid","receiving money"],
   q:"How do I receive payment safely?", a:"Safe payment methods for sellers:\n\n● CASH (Safest for in-person):\n• Count carefully before handing over item\n• For large amounts, count at a bank\n• Get a written receipt\n\n■ BANK TRANSFER:\n• Give buyer your account details\n• Wait for buyer to make transfer\n• VERIFY on YOUR banking app (not their screenshot)\n• Only hand over item after confirming funds in YOUR account\n• Keep transaction receipt\n\n❐ MOBILE MONEY:\n• Give your number and provider\n• Wait for confirmation notification\n• Verify on your phone before releasing item\n\n✗ AVOID:\n• Cheques (can bounce)\n• 'I'll pay you tomorrow'\n• Promises without proof\n• Sending item before payment for distant buyers"},

  {c:"sell", k:["increase sales","more buyers","get more views","popular listing","listing views","more customers","get more inquiries"],
   q:"How do I get more buyers for my listing?", a:"Getting more visibility and buyers:\n\n✶ PHOTOS Great photos are the #1 factor. Take multiple clear, well-lit photos.\n✎ DESCRIPTION Write detailed, keyword-rich descriptions. Think about what buyers search for.\n● PRICE Price competitively. Research what others charge.\n RESPONSIVENESS Reply to inquiries within minutes. Fast responses = more sales.\n♫ PROMOTE Use the 'Promote' feature for extra visibility.\n❐ SOCIAL MEDIA Share your listing link on WhatsApp, Facebook, Instagram.\n↺ REFRESH Edit your listing periodically to bump it in search results.\n★ TRUST Create a Store, build reputation, respond professionally.\n✶ TIMING List during peak hours (morning, lunch, evening).\n❑ NEGOTIATE Be flexible on price. A sale at a slightly lower price is better than no sale.\n\n➤ Pro tip: Listings with 5+ photos and detailed descriptions get 3x more inquiries!"},

  {c:"sell", k:["rejected listing","listing not approved","listing removed","listing deleted","moderation","listing rejected","why was my listing removed"],
   q:"Why was my listing rejected or removed?", a:"Listings may be removed if they:\n\n✗ CONTAIN inappropriate or offensive content\n✗ INCLUDE prohibited items (weapons, drugs, stolen goods)\n✗ Have misleading or false information\n✗ Violate marketplace terms and conditions\n✗ Use stolen or misleading photos\n✗ Are spam (same item posted multiple times)\n✗ Contain inappropriate contact methods\n\n✓ WHAT TO DO:\n1. Review the marketplace terms (terms.html)\n2. Correct any issues in your listing\n3. Resubmit the listing\n4. If you believe it was removed unfairly, click the WhatsApp button below to contact support\n\n➤ Prevention: Read the terms before listing. Be honest, clear, and professional in your listings."},

  {c:"sell", k:["online business","e-commerce","online shop","digital selling","sell online","online store"],
   q:"Can I build an online shop on Kentai Marketplace?", a:"Yes! Kentai Marketplace has a STORE feature:\n\n■ CREATE A STORE:\n1. Click 'Store' in the navigation\n2. Go to store-setup.html\n3. Fill in: Store name, description, category, phone, email, address, website, social media links\n4. Submit your store is live!\n\n STORE BENEFITS:\n• Your own branded profile page\n• All products organized in one place\n• Follower system for customer loyalty\n• Professional appearance\n• Better visibility in search\n• Contact info prominently displayed\n• Buyers can browse all your items easily\n\n➤ Perfect for regular sellers, boutiques, food vendors, service providers, and anyone wanting a professional online presence!"},

  {c:"sell", k:["best time","when to list","listing time","optimal time","peak hours","best time to post","when should i post"],
   q:"When is the best time to list an item?", a:"Best times to post for maximum visibility:\n\n✶ EARLY MORNING (7-9 AM)\n• People browse before work\n• Less competition from new listings\n\n✶ LUNCH HOURS (12-2 PM)\n• People check their phones during lunch\n• High engagement period\n\n✶ EVENING (6-9 PM)\n• HIGHEST TRAFFIC people browse after work\n• Most active buying and selling period\n• Your listing gets maximum initial views\n\n DAYS:\n• Weekends (Saturday & Sunday) more active buyers\n• Monday evenings people plan their week\n\n➤ TIP: List during evening hours for the best initial visibility. The first few hours after posting are crucial!"},

  {c:"sell", k:["renew listing","refresh listing","repost","listing expired","extend listing","renew my listing"],
   q:"Can I renew or refresh my listing?", a:"Yes! Keeping listings fresh:\n\n↺ RENEW:\n1. Go to 'My Listings'\n2. Find your listing\n3. Click 'Edit'\n4. Make a small update (change description wording, add a photo, adjust price slightly)\n5. Save this refreshes the listing's position in search results\n\n LISTING DURATION:\n• Standard listings stay active for a set period (typically 30-90 days)\n• After expiry, you'll need to recreate or renew the listing\n• Promoted listings may have extended durations\n\n➤ TIPS:\n• Edit your listing every few days to keep it fresh\n• Update the description with new information\n• Add new photos if you have them\n• Adjust price if the item isn't selling"},

  {c:"sell", k:["sell internationally","international buyer","ship abroad","overseas","export","sell to another country"],
   q:"Can I sell to buyers outside Nigeria?", a:"International selling:\n\nKentai Marketplace primarily serves the Nigerian market, but you can indicate openness to international sales.\n\n❐ IF SELLING INTERNATIONALLY:\n• Higher shipping costs factor this in\n• Longer delivery times\n• Customs and import duties\n• Payment security is critical\n• Use international logistics (DHL, FedEx)\n• Clarify all terms before agreeing\n\n⚠ IMPORTANT:\n• Verify the buyer's identity thoroughly\n• Get full payment before shipping\n• Use tracked and insured shipping\n• Understand export regulations for your product type\n• Consider the complexity and whether it's worth it for your item"},

  {c:"sell", k:["sell with store","store listing","store products","store page","add to store","store upload"],
   q:"How do I add products to my store?", a:"Adding products to your store:\n\n1. Go to your store profile or click 'Store' in navigation\n2. Navigate to store-upload.html\n3. Fill in product details (same as regular listing):\n   • Title, Description, Price, Category, Condition, Photos\n4. Submit\n5. Product appears on BOTH your store page AND the main marketplace\n\n BENEFITS:\n• Products are associated with your store profile\n• Buyers can see ALL your products in one place\n• Professional, organized presentation\n• Builds your brand identity\n\n➤ Tip: Keep your store products well-organized with consistent photo quality and descriptions."},

  {c:"sell", k:["sell digital","digital product","software","ebook","online course","digital selling","sell files"],
   q:"Can I sell digital products?", a:"Yes! Digital products you can sell:\n\n❐ TYPES:\n• E-books and guides\n• Templates (CV, business cards, flyers, invoices)\n• Online courses and tutorials\n• Software and app licenses\n• Digital art and designs\n• Music, beats, and sound effects\n• Photography presets and filters\n• Website themes and plugins\n\n✎ LISTING TIPS:\n• Clearly describe what the buyer receives\n• Set up a delivery method (email, WhatsApp, download link)\n• Offer samples or previews\n• Be clear about usage rights and licensing\n• Price based on value and market demand\n• Mention if updates are included\n\n⚠ Be careful: Only sell digital products you have the right to sell!"},

  {c:"sell", k:["sell property","real estate","land","house","rental property","sell my house","sell my land","property listing"],
   q:"How do I list real estate?", a:"Listing real estate on Kentai Marketplace:\n\n✶ PHOTOS:\n• Exterior (all angles)\n• Interior (all rooms)\n• Kitchen, bathrooms\n• Surrounding area and neighborhood\n• Any special features (pool, garden, parking)\n\n✎ DESCRIPTION:\n• Location (exact address or area)\n• Size (square meters or plot size)\n• Number of rooms\n• Features and amenities\n• For land: survey plan details, accessibility\n• For houses: furnished or unfurnished, parking, security\n• For rentals: duration, rent amount, terms\n\n✎ DOCUMENTS TO HAVE READY:\n• Certificate of Occupancy (C of O)\n• Survey plan\n• Deed of assignment\n• Proof of ownership\n\n⚠ REAL ESTATE SAFETY:\n• Always use a lawyer\n• Never accept payment without proper documentation\n• Verify buyer's identity\n• Be transparent about the property's legal status"},

  {c:"sell", k:["pricing tips","price strategy","competitive price","market price","how to determine price"],
   q:"What pricing strategy works best?", a:"Effective pricing strategies:\n\n❐ RESEARCH:\n• Check 5-10 similar listings on the marketplace\n• Note the price range\n• Identify the average/market price\n\n➤ STRATEGIES:\n• PSYCHOLOGICAL PRICING ₦49,999 instead of ₦50,000\n• ANCHOR PRICING Mention original price, then your price (shows discount)\n• NEGOTIATION ROOM Price 10-15% above your minimum\n• VALUE-BASED Price based on what's included (accessories, warranty)\n• CONDITION-BASED New: 70-90% retail | Good used: 50-70% | Fair: 30-50%\n\n✗ AVOID:\n• Pricing too high (buyers ignore)\n• Pricing too low (attracts scammers, loses money)\n• Pricing without research\n\n❑ Always add 'Price negotiable' or 'Best offer' if you're flexible!"},

  {c:"sell", k:["seller tips","selling tips","best practices","sell better","selling guide","tips for selling","how to be a good seller"],
   q:"What are general tips for successful selling?", a:"Complete selling guide:\n\n✶ PHOTOS Take excellent photos in good lighting. This is the #1 factor.\n✎ DESCRIPTIONS Write honest, detailed descriptions with keywords buyers search for.\n● PRICING Research competition, price competitively, leave room for negotiation.\n SPEED Respond to inquiries within minutes, not hours.\n♣ FLEXIBILITY Be open to negotiation for faster sales.\n◆ SAFETY Meet in public, confirm payment before handing over items.\n★ REPUTATION Be honest, professional, and reliable.\n↺ UPDATES Refresh listings regularly, keep prices updated.\n■ STORE Create a Store for repeat selling and brand building.\n♫ MARKETING Share listings on social media, WhatsApp status.\n✶ TIMING List during peak hours (evenings, weekends).\n❐ DELIVERY Offer delivery options to reach more buyers.\n\n➤ The most successful sellers are responsive, honest, and price competitively!"},

  {c:"sell", k:["sell books","sell textbook","sell educational","academic books","selling books"],
   q:"How do I sell books?", a:"Selling books:\n\n✎ LISTING DETAILS:\n• Title and author\n• Edition (very important for textbooks)\n• Condition (new, like-new, good, fair)\n• Any highlights, notes, or damage\n• ISBN number (if available)\n• What's included (CDs, access codes)\n\n● PRICING:\n• New books: 70-90% of retail\n• Like-new (no marks): 60-75%\n• Used with marks: 30-50%\n• Out-of-print/rare: Can be higher\n\n✶ PHOTOS:\n• Front cover\n• Back cover\n• Spine\n• Any notable pages (highlighted sections, damage)\n• ISBN page\n\n➤ TIPS:\n• Group related books as a bundle\n• Target students during school resumption periods\n• Mention if it's the latest edition\n• For textbooks, mention the course/subject it's used for"},

  {c:"sell", k:["sell equipment","sell tools","sell machinery","industrial","business equipment","sell industrial"],
   q:"Can I sell business equipment?", a:"Yes! Business and industrial equipment:\n\n■ OFFICE Desks, chairs, computers, printers, phones, filing cabinets\n■ MANUFACTURING Machines, conveyors, packaging equipment\n✶ RESTAURANT Ovens, grills, refrigerators, tables, chairs\n■ MEDICAL Equipment, supplies, furniture\n✶ AGRICULTURAL Tractors, harvesters, processing machines\n❐ CONSTRUCTION Heavy machinery, tools, scaffolding\n\n✎ FOR BUSINESS EQUIPMENT:\n• Detailed specifications\n• Age and usage hours\n• Maintenance history\n• Whether it's working condition\n• Original purchase price\n• Any warranties remaining\n• Reason for selling\n\n➤ Business equipment buyers are often serious provide thorough details and be available for inspections."},

  {c:"sell", k:["sell wholesale","bulk sell","distributor","reseller","supplier","wholesale listing"],
   q:"Can I sell items wholesale?", a:"Yes! Wholesale selling:\n\n❐ HOW TO INDICATE WHOLESALE:\n• Use 'wholesale' or 'bulk' in your title\n• State minimum order quantity (MOQ)\n• Offer tiered pricing (e.g., 1-9: ₦500 each, 10-49: ₦400 each, 50+: ₦300 each)\n• Mention if you're a distributor or direct manufacturer\n\n● WHOLESALE PRICING:\n• Typically 30-50% below retail\n• Volume discounts attract resellers\n• Clear pricing tiers encourage larger orders\n\n✎ LISTING TIPS:\n• Show product samples clearly\n• Mention available quantities in stock\n• State delivery options for bulk orders\n• Provide your business credentials\n• Offer samples for serious buyers\n\n➤ Many retailers and market traders browse the marketplace for wholesale suppliers!"},

  {c:"sell", k:["listing expired","listing duration","how long listing","listing lifetime","when does listing expire"],
   q:"How long does a listing stay active?", a:"Listing duration:\n\n STANDARD LISTINGS:\n• Typically active for 30-90 days\n• After expiry, you'll need to renew or recreate\n\n PROMOTED LISTINGS:\n• Extended duration based on promotion package\n• Stay featured for the paid period\n\n↺ HOW TO CHECK:\n• Go to 'My Listings' to see status of all your listings\n• Expired listings may need to be recreated\n\n➤ TIPS:\n• Renew listings before they expire\n• Edit listings periodically to keep them fresh\n• For items that haven't sold, consider adjusting price or description\n• Delete sold items promptly"},

  {c:"sell", k:["sell event","event planning","party supplies","decoration","event service","sell party"],
   q:"How do I sell event-related items?", a:"Selling event items:\n\n✎ LISTING DETAILS:\n• Type of event (wedding, birthday, corporate, etc.)\n• What's included in the package\n• Whether delivery and setup are included\n• Rental or sale options\n• Available dates (if time-sensitive)\n\n✶ PHOTOS:\n• Items set up/decorated\n• Before and after\n• Different event setups\n• Close-ups of quality\n\n● PRICING:\n• Package deals (decoration + sound + lighting)\n• Individual item pricing\n• Rental rates (per day/weekend)\n• Setup and teardown fees\n\n➤ TIPS:\n• Create listings before peak event seasons\n• Offer custom packages\n• Show your portfolio of past events\n• Be flexible with dates and customization\n• Respond quickly event buyers often need things urgently"},

  {c:"sell", k:["refund buyer","buyer complaint","return request","item returned","dispute","buyer wants refund"],
   q:"What if a buyer wants to return an item?", a:"Handling returns professionally:\n\n✎ REVIEW THE AGREEMENT:\n• What was agreed before the sale?\n• Did you offer a return policy?\n• Was the item as described?\n\n✓ ACCEPT THE RETURN IF:\n• Item doesn't match your description\n• Item is defective or broken\n• You misrepresented the condition\n• You offered a return policy\n\n✗ YOU CAN DECLINE IF:\n• Buyer changed their mind (and no return policy was offered)\n• Buyer damaged the item after purchase\n• Too much time has passed\n\n➤ PROFESSIONAL TIPS:\n• Always stay calm and professional\n• Your reputation matters more than one transaction\n• Document everything (photos, messages)\n• For disputes, click the WhatsApp button below to contact our support team\n• Consider partial refunds as a compromise"},

  {c:"sell", k:["sell handmade","craft","artisan","handcrafted","DIY","handmade items"],
   q:"Can I sell handmade or craft items?", a:"Absolutely! Handmade items are very popular:\n\n✶ WHAT YOU CAN SELL:\n• Handcrafted jewelry\n• Custom clothing and tailoring\n• Artwork and paintings\n• Baked goods and treats\n• Homemade cosmetics and soaps\n• Custom furniture\n• Leather goods\n• Beaded items\n• Crochet and knitting\n• Custom gifts and decorations\n\n✎ LISTING TIPS:\n• Highlight the HANDMADE nature in your title\n• Describe the materials and process\n• Show your crafting process in photos\n• Mention customization options\n• Price based on time, materials, and skill\n• Share your story buyers love knowing the artisan\n\n➤ Handmade items often command premium prices because they're unique!"},

  {c:"sell", k:["sell as business","regular seller","professional seller","volume seller","business selling","sell professionally"],
   q:"How do I sell as a business?", a:"Professional/business selling on Kentai Marketplace:\n\n■ STEP 1 CREATE A STORE:\n• Professional branded page\n• All products organized\n• Contact info displayed\n• Builds trust and credibility\n\n✶ STEP 2 CONSISTENT BRANDING:\n• Use same photo style across all listings\n• Consistent description format\n• Professional language\n• Logo or watermark on photos\n\n● STEP 3 COMPETITIVE PRICING:\n• Research market prices regularly\n• Offer volume discounts\n• Consider loyalty programs\n\n❐ STEP 4 EXCELLENT SERVICE:\n• Respond within minutes\n• Professional communication\n• Reliable delivery\n• After-sales support\n• Handle complaints gracefully\n\n▲ STEP 5 GROWTH:\n• Use promoted listings for key products\n• Encourage followers on your store\n• Ask for reviews and referrals\n• Share on social media\n• Add new products regularly"},

  {c:"sell", k:["fake alert","fake payment","bank alert","payment alert","transfer alert","payment proof","proof of transfer"],
   q:"Someone sent me a fake payment alert. What do I do?", a:"FAKE ALERT SCAM Very common in Nigeria!\n\n❐ HOW TO VERIFY:\n1. LOG INTO YOUR BANKING APP Check if the money is actually in your account.\n2. DON'T trust screenshots they can be easily faked.\n3. DON'T trust SMS alerts alone verify in your banking app.\n4. For large amounts, call your bank to confirm.\n5. Wait for the transaction to reflect in YOUR account balance.\n\n⚠ RED FLAGS:\n• Buyer pressures you to release item immediately\n• Alert shows but your account balance hasn't changed\n• Buyer says 'the money is there, just check'\n• Delayed transfer that 'will reflect soon'\n\n✓ ALWAYS: Verify funds in YOUR account before handing over any item. Never release an item based on a screenshot or SMS alert alone."},

  {c:"sell", k:["why is nobody","nobody viewing","no views","no buyers","listing not getting","not selling","not getting views"],
   q:"Why is nobody viewing my listing?", a:"If your listing isn't getting views:\n\n✧ CHECK THESE:\n1. TITLE Is it descriptive and searchable? 'iPhone 13' is better than 'phone'\n2. PHOTOS Are they clear and attractive? Bad photos = no clicks\n3. PRICE Is it competitive? Too high = buyers skip\n4. DESCRIPTION Is it detailed with keywords? Empty descriptions get ignored\n5. CATEGORY Is it in the right category? Wrong category = wrong audience\n6. TIMING When did you post? Evening posts get more initial views\n\n▲ FIX IT:\n• Edit the title with better keywords\n• Replace or add better photos\n• Adjust the price\n• Add more details to the description\n• Consider promoting the listing\n• Share on social media\n• Edit the listing to refresh its position\n\n➤ Most listings that don't sell have pricing or photo issues!"},

  {c:"sell", k:["delete store","close store","remove store","shut down store","end store","deactivate store"],
   q:"How do I close my store?", a:"Closing your store:\n\n1. Go to your store settings/profile page.\n2. Look for 'Close Store' or 'Deactivate Store' option.\n3. You may need to remove or archive all products first.\n4. Confirm the closure.\n\n⚠ NOTE:\n• This may affect your followers\n• Active listings may be affected\n• You can usually reactivate later by recreating the store\n• Consider editing listings to 'SOLD' status before closing\n\n➤ If you're closing due to issues, click the WhatsApp button below to chat with our support team first they might be able to help resolve the problem."},

  {c:"sell", k:["buyers find my store","store visibility","store discovery","find my store","store search"],
   q:"How do buyers find my store?", a:"Store visibility:\n\n✧ HOW BUYERS FIND YOU:\n• 'Stores' section on the homepage\n• Search results (stores appear in search)\n• Category browsing (stores listed by category)\n• Social media links you share\n• Word of mouth from satisfied customers\n\n▲ INCREASE VISIBILITY:\n• Complete your store profile (all fields)\n• Add quality photos and detailed descriptions\n• Keep products updated regularly\n• Encourage buyers to follow your store\n• Share your store link on social media\n• Offer competitive prices\n• Respond quickly to inquiries\n• Use promoted listings for key products\n\n➤ A complete, active store with good products ranks higher in searches!"},

/* ============================================================
   SECTION 4: STORE FEATURE  (131-160)
   ============================================================ */
  {c:"store", k:["create store","open store","start store","setup store","store account","make a store"],
   q:"How do I create a store?", a:"Creating a store is easy and FREE:\n\n1. Click the 'Store' button in the navigation bar.\n2. Go to store-setup.html.\n3. Fill in your store details:\n   • Store name (your brand name)\n   • Description (what you sell, your story)\n   • Category (Electronics, Fashion, Food, Services, etc.)\n   • Phone number\n   • Email address\n   • Address/Location\n   • Website (if you have one)\n   • Social media links (Instagram, Facebook, Twitter)\n4. Submit your store is live!\n\n Your store gets its own profile page where buyers can browse all your products, see your info, and follow you."},

  {c:"store", k:["store profile","store page","store view","visit store","storefront","my store page"],
   q:"What is a store profile page?", a:"Your store profile page is your dedicated online shop:\n\n✎ WHAT IT SHOWS:\n• Your store name and description\n• Your store logo/banner\n• All your products in one organized place\n• Your contact information (phone, email, address)\n• Your follower count\n• Your store category\n\n◎ WHY IT MATTERS:\n• Professional online presence\n• Buyers can browse ALL your items easily\n• Builds trust and credibility\n• Followers get updates on new products\n• Your brand story is displayed\n\n➤ Think of it as your personal shop within Kentai Marketplace like having your own stall in a big market!"},

  {c:"store", k:["store followers","follow store","followers","follow button","store followers count"],
   q:"How do store followers work?", a:"Store followers work like social media:\n\n♣ FOLLOWING:\n• Buyers can click 'Follow' on your store page\n• Followers get notified when you add new products\n• Follower count is displayed on your profile\n• More followers = more trust and credibility\n\n▲ BENEFITS OF FOLLOWERS:\n• Loyal customer base\n• Repeat business\n• Word-of-mouth marketing\n• Higher ranking in searches\n• Social proof for new buyers\n\n➤ HOW TO GET MORE FOLLOWERS:\n• Offer great products and prices\n• Provide excellent customer service\n• Share your store on social media\n• Ask satisfied customers to follow\n• Post new products regularly\n• Engage with your customers"},

  {c:"store", k:["store category","store type","store classification","store niche","store industry","what category"],
   q:"What store categories are available?", a:"Available store categories:\n\n❐ Electronics & Gadgets\n✶ Fashion & Apparel\n✶ Food & Beverage\n■ Home & Furniture\n✶ Health & Beauty\n➖ Professional Services\n❐ Vehicles & Auto\n■ Real Estate\n✶ Agriculture & Farming\n✶ Education & Books\n✶ Entertainment & Music\n⚽ Sports & Fitness\n Business & Industrial\n✶ Arts & Crafts\n✶ Pets & Animals\n\nChoose the category that best represents your business. You can mention sub-categories in your store description for more specificity."},

  {c:"store", k:["store promotion","promote store","store marketing","store visibility","store boost","market my store"],
   q:"How do I promote my store?", a:"Store promotion strategies:\n\n❐ SOCIAL MEDIA:\n• Share your store link on WhatsApp, Facebook, Instagram, Twitter\n• Post product highlights with your store link\n• Use WhatsApp status to showcase new arrivals\n\n★ INSIDE THE PLATFORM:\n• Use promoted listings for your best products\n• Keep products updated regularly\n• Respond quickly to inquiries\n• Encourage buyers to follow your store\n• Offer competitive prices\n\n✶ CONTENT:\n• Take professional-quality photos\n• Write compelling product descriptions\n• Show behind-the-scenes content\n• Share customer testimonials\n\n♣ NETWORKING:\n• Ask satisfied customers to spread the word\n• Collaborate with other sellers\n• Participate in marketplace community\n• Offer referral discounts"},

  {c:"store", k:["edit store","change store","update store","store settings","store modification","change store info"],
   q:"How do I edit my store information?", a:"Editing your store:\n\n1. Go to your store profile page.\n2. Look for the EDIT option (only visible to store owner).\n3. Update any details:\n   • Store name\n   • Description\n   • Category\n   • Phone number\n   • Email\n   • Address\n   • Website\n   • Social media links\n4. Save changes updated immediately.\n\n➤ Keep your store information current. Update your phone number, add new social media links, and refresh your description as your business grows."},

  {c:"store", k:["store benefits","why store","store advantage","store vs listing","store perks","why create a store"],
   q:"What are the benefits of having a store?", a:"Store benefits why you should create one:\n\n■ PROFESSIONAL PRESENCE Your own branded page that looks professional\n❐ ORGANIZED PRODUCTS All items in one place, easy to browse\n♣ FOLLOWER SYSTEM Build a loyal customer base\n★ TRUST & CREDIBILITY Stores are seen as more trustworthy\n↺ REPEAT CUSTOMERS Easier for buyers to find you again\n▲ BETTER VISIBILITY Stores rank higher in searches\n✶ BRAND STORY Showcase who you are and what makes you special\n❐ CONTACT INFO Prominently displayed for easy reach\n◎ TARGETED AUDIENCE Category-based discovery\n● INCREASED SALES All the above leads to more sales\n\n➤ Even if you're just starting out, a store makes you look professional and trustworthy!"},

  {c:"store", k:["store upload","add product to store","store product","add to store","store listing"],
   q:"How do I add products to my store?", a:"Adding products to your store:\n\n1. Go to your store profile or click 'Store' in navigation.\n2. Navigate to store-upload.html (or look for 'Add Product' button).\n3. Fill in product details:\n   • Title (specific and descriptive)\n   • Description (detailed and honest)\n   • Price (competitive)\n   • Category\n   • Condition\n   • Photos (multiple, clear)\n4. Submit product appears on your store AND the main marketplace.\n\n➤ Tips:\n• Keep consistent photo quality across all products\n• Use similar description format\n• Price items fairly\n• Update products regularly to keep your store active"},

/* ============================================================
   SECTION 5: ACCOUNT & PLATFORM  (161-190)
   ============================================================ */
  {c:"account", k:["create account","sign up","register","new account","join","how to register","make account"],
   q:"How do I create an account?", a:"Creating an account is free and takes 2 minutes:\n\n1. Visit the Kentai Marketplace homepage.\n2. Click 'Sign Up' or 'Register' button.\n3. Enter your email address.\n4. Create a strong password (mix letters, numbers, symbols).\n5. Fill in your profile: name, phone number, location.\n6. Verify your email (check inbox for verification link).\n7. You're ready to browse, buy, and sell!\n\n✓ Registration is completely FREE.\n✓ No credit card needed.\n✓ You can start browsing immediately."},

  {c:"account", k:["login","sign in","log in","access account","enter account","how to login","can't login","login problem"],
   q:"How do I log in?", a:"Logging in:\n\n1. Go to the Kentai Marketplace homepage.\n2. Click the login/sign-in button.\n3. Enter your registered email address.\n4. Enter your password.\n5. Click 'Sign In'.\n\n➖ IF YOU CAN'T LOG IN:\n• Check you're using the correct email\n• Check your password (caps lock?)\n• Try 'Forgot Password' to reset\n• Clear browser cache and try again\n• Try a different browser\n• Click the WhatsApp button below to contact admin"},

  {c:"account", k:["forgot password","reset password","password recovery","can't login","password issue","lost password"],
   q:"I forgot my password!", a:"Resetting your password:\n\n1. Go to the login page.\n2. Click 'Forgot Password' or 'Reset Password'.\n3. Enter the email address associated with your account.\n4. Check your email for a password reset link.\n5. Click the link (it expires after some time, so act quickly).\n6. Create a new strong password.\n7. Log in with your new password.\n\n✶ Don't see the email? Check your SPAM folder!\n↺ If the reset link doesn't work, click the WhatsApp button below to contact our admin"},

  {c:"account", k:["update profile","edit profile","change profile","profile settings","account settings","my profile"],
   q:"How do I update my profile?", a:"Updating your profile:\n\n1. Go to your account settings (click your profile icon).\n2. Edit your information:\n   • Full name\n   • Phone number\n   • Email address\n   • Location (city, state)\n   • Profile picture\n3. Change your password if needed.\n4. Save changes.\n\n➤ Keeping your profile updated builds trust with other users. A complete profile with a real photo gets more responses!"},

  {c:"account", k:["delete account","close account","remove account","deactivate account","delete my account"],
   q:"How do I delete my account?", a:"Deleting your account:\n\n1. Go to your account settings.\n2. Look for 'Delete Account' or 'Deactivate Account'.\n3. Follow the confirmation prompts.\n4. Your account and all data will be removed.\n\n⚠ IMPORTANT:\n• This action may be IRREVERSIBLE\n• All your listings will be removed\n• Your store (if any) will be deleted\n• Your data will be permanently deleted\n\n➤ Before deleting: Consider clicking the WhatsApp button below to contact our admin if you're experiencing issues they might be able to help without needing to delete your account."},

  {c:"account", k:["points","reputation","credits","marketplace points","loyalty","my points","star points"],
   q:"What are marketplace points?", a:"Marketplace points are a reward and reputation system:\n\n★ HOW YOU EARN POINTS:\n• Making purchases\n• Creating listings\n• Promoting items\n• Referring friends to join\n• Completing transactions\n• Being an active community member\n\n❐ WHAT POINTS SHOW:\n• Your activity level on the platform\n• Your reputation as a buyer/seller\n• Higher points = more trust from other users\n\n➤ Points are displayed in the header bar next to the star icon. The more active you are, the more points you earn!"},

  {c:"account", k:["notifications","alerts","email alerts","push notification","stay informed","notification settings"],
   q:"How do I manage notifications?", a:"Managing notifications:\n\n1. Go to your account settings.\n2. Look for 'Notification Preferences'.\n3. Choose what you want to be notified about:\n   • New messages from buyers/sellers\n   • Price changes on items you're watching\n   • New listings in your favorite categories\n   • Transaction updates\n   • Platform announcements\n4. Toggle email and in-app notifications separately.\n\n➤ Don't turn off all notifications you might miss important messages from buyers!"},

  {c:"account", k:["privacy","data protection","personal info","information security","privacy policy","my data"],
   q:"How is my personal information protected?", a:"Your privacy matters to us:\n\n PROTECTION MEASURES:\n• Secure authentication system (Firebase)\n• Data encryption for sensitive information\n• No sharing with third parties without your consent\n• You control what information is visible to others\n• Regular security updates\n\n✎ YOUR RIGHTS:\n• You can update or delete your personal information\n• You can control your visibility settings\n• You can request data deletion\n\n✶ Full Privacy Policy is available on privacy.html page.\n\n➤ We never share your phone number or email with other users without your permission."},

  {c:"account", k:["multiple accounts","second account","two accounts","additional account","another account"],
   q:"Can I have multiple accounts?", a:"We recommend maintaining a SINGLE account for the best experience:\n\n✗ WHY NOT MULTIPLE ACCOUNTS:\n• Can lead to confusion\n• May violate marketplace policies\n• Harder to build reputation\n• Points and history get split\n\n✓ BETTER ALTERNATIVE:\n• Use one account for everything\n• Create a Store under your main account for business\n• Use the same account for buying and selling\n\n➤ If you need separate accounts for personal and business, click the WhatsApp button below to chat with our support team to discuss options."},

  {c:"account", k:["account banned","account suspended","blocked","access denied","banned user","my account is blocked"],
   q:"Why was my account suspended?", a:"Account suspension reasons:\n\n✗ COMMON REASONS:\n• Violating marketplace terms and conditions\n• Posting fraudulent or scam listings\n• Repeated reports from other users\n• Posting prohibited items\n• Scamming or misleading other users\n• Spam behavior (posting same item excessively)\n\n✓ WHAT TO DO:\n1. Review the marketplace terms (terms.html)\n2. If you believe it was a mistake, click the WhatsApp button below to chat with our support team\n3. Provide evidence that you didn't violate any rules\n4. Be polite and professional in your communication\n\n➤ Most suspensions can be resolved by contacting support and showing willingness to comply with rules."},

  {c:"account", k:["change email","update email","email address","change email address","new email"],
   q:"How do I change my email address?", a:"Changing your email:\n\n1. Go to your account settings.\n2. Find the email/profile section.\n3. Update to your new email address.\n4. Verify the new email (check inbox for confirmation).\n5. You'll need to use the NEW email for future logins.\n\n⚠ Make sure:\n• You have access to the new email before changing\n• You remember your password\n• You update any saved login information\n\n↺ If you're having trouble, click the WhatsApp button below to contact our admin"},

  {c:"account", k:["verified account","verification","verify identity","account verification","trust badge","get verified"],
   q:"How do I get my account verified?", a:"Account verification levels:\n\n✶ EMAIL VERIFICATION Click the link sent to your email after registration.\n❐ PHONE VERIFICATION Verify your phone number for buyer/seller trust.\n✶ IDENTITY VERIFICATION For sellers (may require government ID).\n■ BUSINESS VERIFICATION For store owners (business registration documents).\n\n BENEFITS OF VERIFICATION:\n• Trust badge on your profile\n• Higher visibility in searches\n• More buyers trust you\n• Access to additional features\n• Priority support\n\n➤ Start with email verification it's the quickest and easiest!"},

  {c:"account", k:["mobile app","download app","app version","mobile version","android app","ios app","is there an app"],
   q:"Is there a mobile app?", a:"Kentai Marketplace is a Progressive Web App (PWA):\n\n❐ WHAT THIS MEANS:\n• Works perfectly on mobile browsers (Chrome, Safari, Firefox)\n• You can ADD IT TO YOUR HOME SCREEN for quick access (like an app!)\n• Responsive design optimized for all screen sizes\n• No need to download from App Store or Play Store\n• Updates automatically always the latest version\n\n❐ HOW TO ADD TO HOME SCREEN:\n• Android (Chrome): Tap menu → 'Add to Home Screen'\n• iPhone (Safari): Tap share → 'Add to Home Screen'\n\n✓ No app download needed. Just visit the website on your phone!"},

  {c:"account", k:["languages","language","translate","language options","french","igbo","yoruba","hausa"],
   q:"What languages are supported?", a:"Kentai Marketplace is primarily available in English.\n\n◉ For the best experience:\n• Use English when creating listings\n• Communicate in English with other users\n• If you need help in another language (Yoruba, Igbo, Hausa, Pidgin), you can:\n  Use translation tools and then communicate on the platform\n  Click the WhatsApp button below, our admin speaks multiple Nigerian languages\n\n➤ We're always looking to improve accessibility. If language support is important to you, let us know!"},

  {c:"account", k:["change location","set location","my location","city","update location","where am i"],
   q:"How do I change my location?", a:"Updating your location:\n\n1. Go to your account settings.\n2. Update your city, state, or full address.\n3. Save changes.\n\n➤ WHY LOCATION MATTERS:\n• Determines which local listings you see\n• Affects where YOUR items appear for other buyers\n• Helps with delivery arrangements\n• Buyers often prefer local sellers for quick pickup\n\n➤ Keep your location updated for the best marketplace experience. If you move to a new city, update it immediately!"},

  {c:"account", k:["report problem","report issue","problem","bug","technical issue","website problem","site issue"],
   q:"How do I report a technical problem?", a:"Reporting a problem:\n\n✎ OPTIONS:\n1. CONTACT PAGE Go to contact.html and fill in the contact form\n2. WHATSAPP Click the WhatsApp button below (for urgent issues)\n3. EMAIL Use the contact form on the website\n\n✎ WHEN REPORTING, INCLUDE:\n• What happened (describe the issue)\n• What page you were on\n• What device/browser you're using\n• Screenshots if possible\n• Your account email\n\n➖ COMMON ISSUES & QUICK FIXES:\n• Page not loading → Refresh or clear cache\n• Can't upload photos → Check file size and format\n• Login issues → Try password reset\n• Slow performance → Check internet connection"},

  {c:"account", k:["terms","terms of service","rules","policy","guidelines","what are the rules"],
   q:"What are the marketplace rules?", a:"Key marketplace rules:\n\n✗ PROHIBITED:\n• Selling weapons, drugs, or stolen goods\n• Posting fraudulent or misleading listings\n• Using stolen photos from other sellers\n• Spamming (posting same item excessively)\n• Harassing or threatening other users\n• Selling counterfeit items as genuine\n• Any activity violating Nigerian law\n\n✓ EXPECTED BEHAVIOR:\n• Be honest in your listings\n• Respect other users\n• Communicate professionally\n• Meet in safe, public locations\n• Report suspicious activity\n• Follow all local laws and regulations\n\n✶ Full Terms & Conditions: terms.html\n✶ Privacy Policy: privacy.html\n\n⚠ Violating rules may result in listing removal or account suspension."},

  {c:"account", k:["about","about us","company","who we are","our story","about kentai","who made this"],
   q:"Who is behind Kentai Marketplace?", a:"About Kentai Marketplace:\n\nKentai Marketplace is a Nigerian online marketplace designed to connect buyers and sellers across the country. Our mission is to make buying and selling simple, free, and accessible to everyone in Nigeria.\n\n◎ OUR MISSION:\n• Connect Nigerian buyers and sellers directly\n• Provide a free platform for commerce\n• Build a trusted community marketplace\n• Support local businesses and entrepreneurs\n\n✶ For more about us, visit the 'About' page at about.html\n❐ For questions, click the WhatsApp button below"},

  {c:"account", k:["contact support","help","support","customer service","help desk","contact admin","reach support"],
   q:"How do I contact support?", a:"Multiple ways to reach us:\n\n❐ WHATSAPP (Fastest for urgent matters):\nClick the WhatsApp button below to start a chat.\n\n✶ CONTACT FORM:\nGo to contact.html and fill in the form with your question or issue.\n\n✎ FOR SPECIFIC ISSUES:\n• Listing problems → Use Report button on the listing\n• Account issues → WhatsApp admin directly\n• Technical problems → Contact form or WhatsApp\n• Payment disputes → WhatsApp admin with evidence\n\n➤ Response times:\n• WhatsApp: Usually within a few hours during business hours\n• Contact form: Within 24-48 hours\n• Business hours: 9 AM 8 PM, Monday to Saturday"},

  {c:"account", k:["feedback","suggestion","complaint","improvement","suggest","feature request"],
   q:"How do I give feedback or suggestions?", a:"We love hearing from our users!\n\n✎ WAYS TO GIVE FEEDBACK:\n1. Contact page (contact.html) Detailed feedback form\n2. Click the WhatsApp button below for quick suggestions\n3. This chat Tell me what you'd like improved\n\n➤ We especially want to hear about:\n• Features you'd like to see\n• Problems you've experienced\n• Ideas to make the platform better\n• Your overall experience\n\nYour feedback directly helps us improve Kentai Marketplace for everyone!"},

/* ============================================================
   SECTION 6: SAFETY & TRUST  (191-215)
   ============================================================ */
  {c:"safety", k:["scam","fraud","fake","con artist","scammer","scamming","is this a scam"],
   q:"How do I identify a scammer?", a:"Red flags of scammers:\n\n❐ PRICE RED FLAGS:\n• Prices that are TOO good to be true (50%+ below market)\n• 'Urgent sale, must sell today'\n\n❐ COMMUNICATION RED FLAGS:\n• Reluctance to meet in person\n• Pressure to pay immediately\n• Refuses video call or additional photos\n• Generic responses, won't answer specific questions\n• Asks you to click suspicious links\n\n❐ PAYMENT RED FLAGS:\n• Requests unusual payment methods\n• Sends fake payment alerts\n• Offers to pay MORE than your asking price\n• Asks for your bank details 'to send money'\n\n❐ LISTING RED FLAGS:\n• Stolen or generic photos (reverse image search to check)\n• Vague descriptions with no specifics\n• New account with no other listings\n• Won't provide proof of ownership\n\n✓ ALWAYS: Meet in public, inspect before paying, trust your instincts!"},

  {c:"safety", k:["report scam","report fraud","report user","report listing","complaint","report suspicious","how to report"],
   q:"How do I report a scam or fraudulent listing?", a:"Reporting scams:\n\n✎ HOW TO REPORT:\n1. Go to the listing page\n2. Look for the 'REPORT' button\n3. Select the reason:\n   • Scam / Fraudulent\n   • Fake item / Counterfeit\n   • Inappropriate content\n   • Prohibited item\n   • Harassment\n4. Add details and evidence (screenshots, messages)\n5. Submit the report\n\n❐ URGENT REPORTS:\n• Click the WhatsApp button below to contact admin\n• Include all evidence\n• The team will review and take action\n\n➤ Your reports help protect other users from scammers!"},

  {c:"safety", k:["safe meeting","meeting safety","public place","safe exchange","meetup safety","safest place"],
   q:"Where is the safest place to meet for exchanges?", a:"Safest meeting places (ranked):\n\n1. POLICE STATIONS Many have designated exchange areas. SAFEST OPTION.\n BANK PARKING LOTS Well-lit, cameras, easy to verify bank transfers.\n SHOPPING MALLS Busy, well-lit, security guards present.\n4. POPULAR RESTAURANTS/CAFES Public, comfortable, witnesses around.\n5. FUEL STATIONS Well-lit, cameras, always staffed.\n6. WELL-LIT PUBLIC PARKS Only during DAYTIME.\n\n✗ NEVER MEET AT:\n• Private homes or apartments\n• Isolated or dark areas\n• Empty streets or parking lots at night\n• Accepting rides from strangers\n• Anywhere you feel uncomfortable\n\n➤ Tips:\n• Tell someone where you're going\n• Bring a friend\n• Share your location with a trusted person\n• Trust your instincts if it feels wrong, leave"},

  {c:"safety", k:["secure payment","safe payment","payment safety","money safety","payment protection","safe transaction"],
   q:"How do I ensure safe payment?", a:"Safe payment practices:\n\n★ SAFEST METHODS (ranked):\n1. CASH at a public meeting Inspect item, count money, done.\n2. BANK TRANSFER at a bank Verify transfer on YOUR app before releasing item.\n3. MOBILE MONEY Confirm receipt on YOUR phone.\n\n⚠ NEVER:\n• Send money before seeing the item\n• Trust payment screenshots (they can be faked)\n• Accept 'I'll pay you later'\n• Use unfamiliar payment platforms\n• Share your bank PIN or OTP with anyone\n\n✓ ALWAYS:\n• Verify payment in YOUR account (not their screenshot)\n• Get a written receipt\n• Keep records of all communications\n• For high-value items, meet at a bank\n• Use escrow or trusted middleman for very expensive items"},

  {c:"safety", k:["identity theft","personal information","data safety","information protection","privacy safety","protect my info"],
   q:"How do I protect my personal information?", a:"Protecting your personal information:\n\n NEVER SHARE:\n• Bank account details or PIN\n• Your home address (use meetup points)\n• OTP codes or verification codes\n• Your account password\n• Government ID photos (unless verified through proper channels)\n\n◆ BEST PRACTICES:\n• Use a strong, unique password\n• Don't share account credentials with anyone\n• Be cautious in public messages\n• Verify the other party's identity\n• Don't click suspicious links\n• Report anyone asking for excessive personal information\n\n➤ Remember: Legitimate sellers/buyers only need your phone number to communicate. They don't need your bank details, home address, or ID."},

  {c:"safety", k:["product authenticity","fake product","original product","counterfeit","genuine","is it original","verify product"],
   q:"How do I verify a product is authentic?", a:"Product authenticity verification:\n\n✧ PHYSICAL CHECKS:\n• Brand markings, logos, holograms\n• Packaging quality (font, colors, materials)\n• Serial numbers (check on manufacturer website)\n• Build quality and materials\n• Weight (counterfeits often feel lighter)\n\n❐ FOR ELECTRONICS:\n• Check IMEI/serial on manufacturer's website\n• Verify model specs match official specifications\n• Check for official warranty\n• Test all functions thoroughly\n\n✶ FOR FASHION:\n• Check stitching quality\n• Verify brand labels and tags\n• Compare with official product images\n• Check material quality\n\n⚠ RED FLAGS:\n• Price significantly below market\n• Seller can't provide proof of purchase\n• Packaging looks off\n• Seller avoids questions about authenticity\n\n➤ When in doubt, meet in person and inspect thoroughly!"},

  {c:"safety", k:["trustworthy seller","reliable seller","good seller","trusted","seller reputation","is seller legit"],
   q:"How do I know if a seller is trustworthy?", a:"Signs of trustworthy sellers:\n\n✓ GOOD SIGNS:\n• Detailed, honest listings with real photos\n• Responsive and professional communication\n• Willing to meet in public places\n• Transparent about condition and defects\n• Reasonable pricing (not too cheap, not too expensive)\n• Answers questions thoroughly\n• Has other listings or a Store\n• Positive mentions or recommendations\n• Willing to provide additional photos\n• Doesn't pressure you to pay quickly\n\n✗ BAD SIGNS:\n• Reluctance to meet in person\n• Pushy or aggressive communication\n• Prices too good to be true\n• Generic/stolen photos\n• Won't answer specific questions\n• Pressure tactics\n• New account with no history\n\n➤ Trust your instincts. If something feels off, walk away!"},

  {c:"safety", k:["escrow","middleman","third party","safe transaction","secure deal","escrow service"],
   q:"Is there an escrow service?", a:"Kentai Marketplace currently operates as a direct buyer-seller connection platform without built-in escrow.\n\n FOR HIGH-VALUE TRANSACTIONS:\n• Meet at a BANK verify transfer immediately\n• Use a TRUSTED THIRD PARTY mutual friend who holds the money\n• Hire a LAWYER for vehicles, real estate, or very expensive items\n• Use established logistics companies some offer payment-on-delivery\n\n➤ SAFETY TIPS:\n• For items under ₦50,000 cash on meeting is usually fine\n• For ₦50,000-₦500,000 bank transfer with verification at a bank\n• For ₦500,000+ use a lawyer or trusted intermediary\n\nWe're working on adding escrow features in future updates!"},

  {c:"safety", k:["online safety","internet safety","digital safety","cybersecurity","online protection","stay safe online"],
   q:"What are general online safety tips?", a:"Essential online safety tips:\n\n❐ ACCOUNTS:\n• Use strong, unique passwords\n• Don't reuse passwords across platforms\n• Enable two-factor authentication if available\n\n◆ BROWSING:\n• Don't click suspicious links\n• Verify website URLs before entering information\n• Don't download files from unknown sources\n\n♣ TRANSACTIONS:\n• Meet in public places\n• Verify seller/buyer identities\n• Don't share financial information\n• Inspect items before paying\n• Trust your instincts\n\n❐ COMMUNICATION:\n• Keep conversations on the platform when possible\n• Don't share OTP codes or verification codes\n• Be cautious of unsolicited messages\n\n✎ RECORDS:\n• Keep records of all transactions\n• Save screenshots of important conversations\n• Get receipts for all payments\n\n➤ When in doubt, click the WhatsApp button below to contact our admin."},

  {c:"safety", k:["child safety","minor","underage","young user","teenager","kids safety","children"],
   q:"Is the marketplace safe for minors?", a:"Safety for minors:\n\n⚠ Kentai Marketplace is designed for ADULTS (18+).\n\n✶✶✶ FOR PARENTS:\n• Monitor your children's activity on the platform\n• Don't allow minors to make purchases or sales independently\n• Ensure all meetings with sellers/buyers are accompanied by adults\n• Teach children about online safety and scams\n• Set parental controls on devices\n\n✎ RECOMMENDED:\n• Parents should manage accounts for minors\n• All transactions should be supervised by adults\n• Meet in very safe locations with adults present\n• Never share personal information online\n\n➤ If you're a young person wanting to buy or sell, please ask a parent or guardian to help you!"},

/* ============================================================
   SECTION 7: PAYMENTS  (216-225)
   ============================================================ */
  {c:"payments", k:["bank transfer","transfer money","send money","bank payment","account transfer","how to transfer"],
   q:"How do I pay via bank transfer?", a:"Bank transfer payment guide:\n\n✎ STEPS:\n1. Get seller's bank details: Account number, Bank name, Account name\n2. VERIFY the account name matches the seller's identity\n3. Open your banking app or visit your bank\n4. Enter the details and make the transfer\n5. Send the transfer receipt/screenshot to the seller\n6. SELLER MUST VERIFY on their banking app (not just your screenshot)\n7. Only then hand over the item\n\n⚠ SAFETY:\n• Double-check account number before sending\n• Verify account name matches\n• Keep your transfer receipt\n• For large amounts, do the transfer at the bank\n• Don't send to accounts that don't match the seller's name\n\n➤ If you're the SELLER: Always verify the money is in YOUR account before releasing the item!"},

  {c:"payments", k:["mobile money","mtn mobile money","airtel money","mobile payment","telecom payment","momo"],
   q:"How do I pay using mobile money?", a:"Mobile money payment:\n\n❐ STEPS:\n1. Get seller's mobile money number and provider (MTN MoMo, Airtel Money, etc.)\n2. Open your mobile money app\n3. Select 'Send Money' or 'Transfer'\n4. Enter seller's number\n5. Enter the amount\n6. Confirm with your PIN\n7. Save the transaction confirmation\n8. Send confirmation to seller\n9. Verify seller received the funds\n\n✓ ADVANTAGES:\n• Instant transfer\n• Transaction confirmation is hard to fake\n• Works even without internet banking\n\n⚠ SAFETY:\n• Verify the number belongs to the seller\n• Keep transaction confirmation\n• Don't send to unknown numbers\n• For large amounts, consider bank transfer instead"},

  {c:"payments", k:["cash payment","cash on delivery","cash on meeting","cash deal","pay cash","cash transaction"],
   q:"What about cash payments?", a:"Cash payments simplest method:\n\n✓ ADVANTAGES:\n• No technology needed\n• Instant and final\n• No risk of fake alerts\n• Easy to verify (count the money)\n\n✎ BEST PRACTICES:\n• Count the money carefully before handing over the item\n• For large amounts, count at a bank\n• Get a written receipt from the seller\n• Inspect the item THOROUGHLY before paying\n• Carry only the exact amount needed\n• Keep change ready\n\n⚠ SAFETY:\n• Don't carry large amounts of cash in unsafe areas\n• Meet at well-lit, public locations\n• For amounts over ₦100,000, consider bank transfer instead\n• Be discreet don't flash cash in public\n\n➤ Cash is the SAFEST payment method for in-person transactions!"},

  {c:"payments", k:["payment dispute","payment issue","payment problem","transaction issue","payment failed","transaction failed"],
   q:"What if there's a payment dispute?", a:"Handling payment disputes:\n\n✎ IMMEDIATE STEPS:\n1. Keep ALL evidence (receipts, screenshots, messages, bank records)\n2. Try to resolve directly with the other party (calmly and professionally)\n3. If unresolved, click the WhatsApp button below to contact Kentai Marketplace admin.\n4. For bank transfers, contact your BANK within 24 hours if fraud is suspected\n5. For significant amounts, consider filing a police report or EFCC complaint\n\n✎ DOCUMENT EVERYTHING:\n• Screenshots of conversations\n• Payment receipts and confirmations\n• Listing details\n• Meeting location and time\n• Photos of the item (if applicable)\n\n➤ Prevention is better than cure always follow safe payment practices!"},

  {c:"payments", k:["receipt","proof of payment","transaction proof","payment confirmation","payment record","get receipt"],
   q:"Should I get a receipt?", a:"ALWAYS get a receipt!\n\n✎ A RECEIPT PROVES:\n• The transaction took place\n• The amount paid\n• The item received\n• The date of transaction\n• Both parties agreed\n\n✎ RECEIPT CAN BE:\n• A written note with: date, item description, price, both parties' names, signatures\n• A screenshot of bank transfer confirmation\n• A mobile money transaction receipt\n• A printed bank transfer slip\n\n➤ TIPS:\n• Even a simple handwritten receipt is better than nothing\n• For digital payments, save ALL screenshots\n• Keep receipts organized (photos in a dedicated album)\n• Receipts help resolve future disputes\n• Some sellers may not offer receipts ask for one politely"},

/* ============================================================
   SECTION 8: GENERAL & FAQ  (226-250)
   ============================================================ */
  {c:"general", k:["what is kentai","about kentai","kentai marketplace","what is this platform","tell me about kentai","what is this website"],
   q:"What is Kentai Marketplace?", a:"Kentai Marketplace is a Nigerian online marketplace that connects buyers and sellers directly.\n\n◎ WHAT WE DO:\n• Buyers find products they want\n• Sellers list products they want to sell\n• Direct communication between buyers and sellers\n• No commission, no middleman\n\n❐ CONTACT US: Please click the WhatsApp button below to start a chat.\n➤ The best way to buy and sell in Nigeria all in one place!"},

  {c:"general", k:["free","cost","charges","fees","pricing","is it free","free to use","any charges"],
   q:"Is Kentai Marketplace free?", a:"Yes! Kentai Marketplace is completely FREE for basic use:\n\n✓ FREE: Browsing, searching, creating listings, buying, selling\n✓ FREE: Creating unlimited listings\n✓ FREE: Creating a Store\n✓ FREE: Messaging sellers via phone/WhatsApp\n✓ NO COMMISSION on sales\n\n● OPTIONAL PAID FEATURES:\n• Promoted/Premium listings (for extra visibility)\n• These are optional you can sell successfully without them\n\nNo hidden fees, no subscription required!"},

  {c:"general", k:["competitor","comparison","vs jumia","vs jiji","similar platforms","how is it different"],
   q:"How is Kentai Marketplace different from Jumia or Jiji?", a:"How Kentai compares:\n\n✓ PRICING:\n• Kentai: Free basic listings, no commission\n• Jumia: Commission on sales\n• Jiji: Free basic, paid features\n\n■ STORES:\n• Kentai: Free store creation for all sellers\n• Jumia: Official stores for verified businesses\n• Jiji: No dedicated store feature\n\n♣ CONNECTION:\n• Kentai: Direct buyer-seller phone/WhatsApp contact\n• Jumia: Platform-mediated communication\n• Jiji: Direct contact (similar to Kentai)\n\n❐ PLATFORM:\n• Kentai: PWA (works on all devices, no app download)\n• Jumia: Dedicated mobile app\n• Jiji: Dedicated mobile app\n\nNG FOCUS:\n• Kentai: Nigerian market, community-driven\n• Jumia: Pan-African e-commerce giant\n• Jiji: Nigerian classifieds\n\n➤ Kentai's advantage: Free, simple, no commission, store feature, and direct human connection!"},

  {c:"general", k:["nigeria","locations","cities","states","coverage area","which cities","available in"],
   q:"Which cities does Kentai Marketplace cover?", a:"Kentai Marketplace serves ALL of Nigeria:\n\n❐ MAJOR CITIES:\nLagos, Abuja, Port Harcourt, Kano, Ibadan, Benin City, Kaduna, Enugu, Abeokuta, Jos, Ilorin, Warri, Owerri, Calabar, Uyo, Maiduguri, Sokoto, Bauchi, Zaria, Akure, Ado-Ekiti, Lokoja, Makurdi, Lafia, Damaturu, Gombe, Yola, Dutse, Birnin Kebbi, Damaturu\n\n➤ HOW IT WORKS:\n• Sellers list their location on each item\n• You can search by city or state\n• Find products near you or arrange delivery from other cities\n• Accessible anywhere in Nigeria with internet access\n\n➤ The platform grows daily more cities and sellers are added regularly!"},

  {c:"general", k:["hours","operating hours","business hours","available time","support hours","when can i contact"],
   q:"What are the operating hours?", a:"Kentai Marketplace availability:\n\n◉ PLATFORM: Available 24/7 online\n• Browse, list, and communicate anytime\n\n❐ DIRECT SELLER CONTACT:\n• Most sellers active: 9 AM 8 PM\n• Peak hours: 12 PM 2 PM (lunch), 6 PM 9 PM (evening)\n\n♫ SUPPORT (Admin):\n• WhatsApp: 9 AM 8 PM, Monday to Saturday\n• Contact form: 24/7 (responses during business hours)\n• Messages sent outside hours are responded to next business day\n\n➤ For urgent matters, WhatsApp is the fastest way to reach us!"},

  {c:"general", k:["whatsapp number","contact whatsapp","admin whatsapp","support whatsapp","whatsapp support","admin contact","how to reach admin","admin number"],
   q:"How do I contact the admin via WhatsApp?", a:"WhatsApp contact for Kentai Marketplace:\n\n❐ Please click the WhatsApp button below to start a chat.\n➠ DIRECT LINK: Please click the WhatsApp button below to chat with our support team.\n\nUSE WHATSAPP FOR:\n• Urgent support issues\n• Account problems\n• Reporting serious scams\n• Business inquiries\n• Payment disputes\n• Technical problems\n• General questions not answered here\n\n✎ WHEN MESSAGING:\n• Be respectful and concise\n• Include relevant details (listing URL, account email, screenshots)\n• State your issue clearly\n\n Response time: Usually within a few hours during business hours (9 AM 8 PM, Mon-Sat)."},

  {c:"general", k:["promote listing","paid listing","advertising","boost","premium","how to promote","promotion"],
   q:"How do I promote my listing?", a:"Promoting your listing:\n\n▲ BENEFITS OF PROMOTION:\n• Featured on homepage\n• Higher in search results\n• 'Premium' badge\n• More views and inquiries\n• Longer listing duration\n\n✎ HOW TO PROMOTE:\n1. Go to the 'Promote' page (promote.html)\n2. Select the listing you want to promote\n3. Choose promotion duration and type\n4. Complete payment\n5. Your listing goes live as promoted!\n\n➤ WHEN TO PROMOTE:\n• High-value items\n• Competitive categories (many similar listings)\n• When you need to sell quickly\n• New store owners building visibility\n\n❐ RESULTS: Promoted listings typically get 3-5x more views than regular listings!"},

  {c:"general", k:["upload photo","add photo","image upload","photo limit","photo size","how many photos","photo requirements"],
   q:"What are the photo requirements?", a:"Photo guidelines for listings:\n\n✶ HOW MANY:\n• Minimum: 1 photo (but 3-5 recommended)\n• Maximum: As many as you want!\n• More photos = more buyer interest\n\n PHOTO REQUIREMENTS:\n• Format: JPG, PNG\n• Size: Under 5MB per photo\n• Quality: Clear, not blurry\n• Resolution: At least 800x600 pixels recommended\n\n➤ BEST PRACTICES:\n• Front, back, sides, top views\n• Close-ups of features and any defects\n• Include accessories\n• Natural lighting\n• Plain background\n• Show item in use if applicable"},

  {c:"general", k:["blocked item","prohibited","banned items","not allowed","illegal items","what can't i sell","restricted items"],
   q:"What items are prohibited?", a:"Prohibited items on Kentai Marketplace:\n\n✗ STRICTLY PROHIBITED:\n• Weapons and firearms\n• Illegal drugs and substances\n• Stolen goods\n• Counterfeit/fake branded items sold as genuine\n• Human trafficking or exploitation\n• Endangered wildlife products\n• Items violating Nigerian law\n• Pornographic or inappropriate content\n• Pyramid schemes or fraudulent financial products\n• Hacked or stolen digital accounts\n• Prescription drugs without authorization\n\n⚠ CONSEQUENCES:\n• Listing removed immediately\n• Account may be suspended\n• Repeated violations = permanent ban\n• Serious violations reported to authorities\n\n➤ When in doubt, don't list it. If you're unsure whether an item is allowed, click the WhatsApp button below to ask our admin."},

  {c:"general", k:["share listing","share link","social media","share product","link sharing","how to share"],
   q:"How do I share a listing?", a:"Sharing a listing:\n\n▲ HOW TO SHARE:\n1. Open the listing page\n2. Copy the URL from your browser's address bar\n3. Share via:\n   • WhatsApp (send to contacts or post on status)\n   • Facebook (post or share in groups)\n   • Twitter/X (tweet the link)\n   • Instagram (add link in bio or stories)\n   • Any messaging platform\n\n➤ TIPS:\n• Add a brief description when sharing\n• Share in relevant groups and communities\n• For sellers: share your own listings to get more views\n• For buyers: share items with friends who might be interested\n\nSharing increases visibility and chances of a sale!"},

  {c:"general", k:["offline","no internet","without internet","offline mode","use offline"],
   q:"Can I use Kentai Marketplace offline?", a:"Offline usage:\n\n⚠ Kentai Marketplace requires internet for most features.\n\n✓ WHAT WORKS OFFLINE:\n• Previously loaded pages (cached)\n• Saved/printed listing pages\n• Screenshots of listings\n\n✗ WHAT NEEDS INTERNET:\n• Browsing new listings\n• Creating new listings\n• Messaging sellers\n• Account login\n• All dynamic features\n\n➤ TIPS:\n• As a PWA, the app works well on slow connections (3G)\n• Pages are optimized for low data usage\n• You can save listing pages for offline reference\n• Once connected again, everything works normally"},

  {c:"general", k:["questions replies","q and a","ask question","community","forum","community questions"],
   q:"How do the questions and replies work?", a:"Questions & Replies feature:\n\n❔ HOW IT WORKS:\n• Visit the Questions & Replies page (questions-replies.html)\n• Ask questions about items or the platform\n• Answer questions from other users\n• Get community help with buying/selling decisions\n• Build your reputation by helping others\n\n➤ BENEFITS:\n• Get advice from experienced users\n• Help others and earn community points\n• Learn tips and tricks from the community\n• Find answers to common questions\n\n❑ You can also ask me (this chatbot) any question directly!"},

  {c:"general", k:["update app","new version","app update","latest version","changelog","what's new"],
   q:"How do I update Kentai Marketplace?", a:"Updating the platform:\n\n↺ AUTOMATIC UPDATES:\n• Kentai Marketplace is a web application updates are deployed automatically\n• No manual update needed!\n• Simply refresh your browser for the latest version\n• If added to home screen (PWA), it updates when you open it\n\n❐ NEW FEATURES:\n• New features and improvements are added regularly\n• No app store download required\n• Always running the latest version\n\n➤ Just keep using the platform it updates itself!"},

  {c:"general", k:["my listings","my items","my products","listing history","sold items","view my listings","manage listings"],
   q:"How do I view and manage my listings?", a:"Managing your listings:\n\n✎ VIEW YOUR LISTINGS:\n1. Click 'My List' or 'My Listings' in the navigation\n2. See all your active listings in one place\n3. From here you can:\n   • Edit any listing\n   • Delete listings\n   • Check listing status\n   • See inquiries on your items\n\n➤ TIPS:\n• Review listings regularly\n• Update prices based on market\n• Delete sold items promptly\n• Refresh unsold items periodically\n• Add new photos if you have better ones"},

  {c:"general", k:["item detail","product detail","item page","product page","listing detail","what's on the page"],
   q:"What information is on an item detail page?", a:"Item detail page contents:\n\n✎ WHAT YOU'LL SEE:\n1. Item title and price\n2. Multiple photos (swipe through them)\n3. Detailed description\n4. Category and condition\n5. Seller's name and contact information (phone number)\n6. Location of the item\n7. Date the item was listed\n8. Option to share the listing\n9. Related or similar items\n10. Seller's other listings (if available)\n\n➤ Scroll down to find the seller's contact info for direct communication!"},

  {c:"general", k:["trending","featured","hot items","popular now","new arrivals","what's new"],
   q:"How do I find trending or featured items?", a:"Finding trending items:\n\n WHERE TO LOOK:\n1. HOMEPAGE Featured/premium listings appear at the top\n2. CAROUSEL Homepage slider highlights trending items\n3. CATEGORY PAGES Browse by category to see popular items\n4. SEARCH Sort by 'Most Popular' to see trending items\n\n▲ WHAT MAKES ITEMS TRENDING:\n• High number of views\n• Many inquiries\n• Promoted/premium status\n• Recently listed in popular categories\n• Competitive pricing\n\n➤ Check back regularly new items are listed daily!"},

  {c:"general", k:["referral","invite friend","refer","referral bonus","invite","earn rewards"],
   q:"Can I earn rewards by referring friends?", a:"Referral program:\n\n♣ REFERRAL BENEFITS:\n• Earn marketplace points for inviting friends\n• Friends get started on the platform\n• Both you and your friend may receive benefits\n\n▲ HOW TO REFER:\n• Share your referral link (if available in account settings)\n• Share the marketplace URL with friends\n• Tell friends about the free listing feature\n• Share on WhatsApp, social media\n\n➤ Check your account settings or click the WhatsApp button below to chat with our support team for current referral program details and active promotions."},

  {c:"general", k:["accessibility","disability","screen reader","accessible","inclusive","disability access"],
   q:"Is Kentai Marketplace accessible?", a:"Accessibility information:\n\n OUR COMMITMENT:\n• Platform uses standard web technologies\n• Compatible with most screen readers\n• Responsive design works on all devices\n• Clear navigation and labeling\n\n➖ IF YOU EXPERIENCE ISSUES:\n• Try different browsers (Chrome, Firefox, Safari)\n• Contact support with specific accessibility issues\n• We continuously work to improve accessibility\n\n❐ For accessibility assistance, click the WhatsApp button below to contact our admin."},

  {c:"general", k:["data usage","internet data","bandwidth","mobile data","data consumption","uses data"],
   q:"Does the marketplace use a lot of data?", a:"Data usage information:\n\n❐ DATA USAGE:\n• Optimized for LOW data usage\n• Images are compressed for faster loading\n• Lightweight interface and responsive design\n• Pages load quickly even on 3G\n• Works well on Nigerian mobile networks\n\n➤ DATA-SAVING TIPS:\n• Avoid loading too many image-heavy listings at once\n• Use WiFi when available\n• The PWA caches some content for reduced data\n• Close the app when not in use\n\n✓ Designed to work well even with limited data plans!"},

  {c:"general", k:["future","roadmap","coming soon","new features","what's next","upcoming"],
   q:"What new features are coming?", a:"Future features in development:\n\n▲ PLANNED FEATURES:\n1. In-app messaging system\n2. Payment integration (pay directly on the platform)\n3. Buyer protection program\n4. AI-powered recommendations\n5. Video listings\n6. Auction-style listings\n7. Delivery integration with logistics partners\n8. Enhanced seller analytics dashboard\n9. Wishlist feature\n10. Rating and review system\n\n♫ Follow our social media for announcements about new features!\n➤ Have a feature suggestion? Click the WhatsApp button below to contact our admin."},

  {c:"general", k:["speak with agent","talk to agent","speak to human","real person","human support","live person","i want to talk","connect me","talk to someone","speak to admin"],
   q:"I want to speak with someone directly.", a:"I understand you'd like to speak with a real person! For direct human support:\n\n➠ Please click the WhatsApp button below to start a chat.\n\nThey'll be happy to help you with:\n• Account issues\n• Technical problems\n• Payment disputes\n• Business inquiries\n• Complaints\n• Any question not answered here\n\nAvailable: 9 AM 8 PM, Monday to Saturday."},

  {c:"general", k:["agent","chatbot","ai","bot","automated","are you real","are you human","what are you","who made you"],
   q:"Are you a real person?", a:"I'm the Kentai Marketplace Intelligent Assistant a smart chatbot designed to answer your questions quickly and helpfully!\n\n⚙ WHAT I CAN DO:\n• Answer questions about buying and selling\n• Help with account issues\n• Provide safety tips\n• Explain how the platform works\n• Guide you through any process\n\n○ FOR HUMAN SUPPORT:\nIf you need personalized assistance, have a complex issue, or just prefer talking to a real person, click the WhatsApp button below to chat with our support team. They're real humans who care about helping you!"},

  {c:"general", k:["business listing","company","corporate","business account","commercial","sell as company"],
   q:"Can businesses list on Kentai Marketplace?", a:"Absolutely! Businesses are welcome:\n\n■ FOR BUSINESSES:\n1. Create a Store for professional presence\n2. List multiple products under your store\n3. Build your brand on the platform\n4. Reach customers directly\n5. Offer professional services\n6. No commission on sales\n\n▲ BUSINESS BENEFITS:\n• Free to start no listing fees\n• Store feature for branding\n• Direct customer communication\n• Build reputation and followers\n• No middleman taking a cut\n\n➤ Many Nigerian businesses use Kentai Marketplace to reach customers and grow sales. The Store feature is specifically designed for business sellers!"},

  {c:"general", k:["seasonal","christmas","ramadan","eid","holiday shopping","festive","black friday","detty december"],
   q:"Are there seasonal promotions?", a:"Seasonal promotions on Kentai Marketplace:\n\n SEASONAL EVENTS:\n• Christmas / Detty December\n• Ramadan / Eid\n• Independence Day (October 1)\n• Black Friday\n• New Year\n• Back to School\n• Easter\n\n❐ DURING SEASONS YOU MAY FIND:\n• Discounted items\n• Featured sellers\n• Special promotions\n• Increased listings\n• Seasonal categories highlighted\n\n➤ Keep an eye on the homepage for seasonal deals! Sellers often offer discounts during these periods."},

  {c:"general", k:["international","shipping abroad","foreign buyer","international shipping","overseas delivery","ship outside nigeria"],
   q:"Can I ship items internationally?", a:"International shipping:\n\n⚠ Kentai Marketplace primarily serves the Nigerian market.\n\n❐ IF YOU NEED INTERNATIONAL SHIPPING:\n1. Ask the seller directly if they offer it\n2. Discuss shipping costs and delivery time\n3. Consider international logistics (DHL, FedEx, UPS)\n4. Be aware of customs duties and import taxes\n5. Payment security is especially important\n6. Use tracked and insured shipping\n\n➤ For international transactions, click the WhatsApp button below to chat with our support team for guidance."},

  {c:"general", k:["statistics","marketplace stats","user count","number of users","growth","how big"],
   q:"How many users does Kentai Marketplace have?", a:"Kentai Marketplace is growing rapidly:\n\n▲ GROWTH:\n• Users across all Nigerian states\n• Thousands of active buyers and sellers daily\n• New listings added every day\n• Growing store community\n\n❐ For specific statistics and growth numbers, click the WhatsApp button below to chat with our support team who can provide the latest figures.\n\n➤ The platform is continuously growing as more Nigerians discover the free, easy way to buy and sell!"},

  {c:"general", k:["copyright","intellectual property","ownership","content rights","image rights","stolen photos"],
   q:"What are the copyright rules?", a:"Copyright rules on Kentai Marketplace:\n\n✗ DON'T:\n• Use photos you didn't take (without permission)\n• Copy another seller's listing description\n• Sell counterfeit items as genuine\n• Use brand logos without authorization\n• Reproduce copyrighted content\n\n✓ DO:\n• Use your own photos\n• Write your own descriptions\n• Respect trademark and brand rights\n• Report stolen content using the Report button\n\n⚠ VIOLATIONS:\n• Content may be removed\n• Account may be suspended\n• Legal action may be taken for serious violations\n\n➤ Your listing content belongs to you while listed. The platform reserves the right to remove content violating copyright."},

  {c:"general", k:["bulk upload","upload many","multiple upload","batch upload","upload several","many items at once"],
   q:"Can I upload multiple items at once?", a:"Bulk uploading:\n\n✎ CURRENT SYSTEM:\n• Each listing is created individually through the listing form\n• No batch/bulk upload feature yet\n\n➤ WORKAROUNDS:\n1. Prepare all photos and descriptions beforehand\n2. Create listings one by one (it's fast once you're used to it)\n3. Use the Store feature to organize products efficiently\n4. For very large inventory, click the WhatsApp button below to contact our support team\n\n▲ Bulk upload is a planned feature for future updates!"},

  {c:"general", k:["download","export data","save data","backup listing","data export","my data"],
   q:"Can I download or export my listing data?", a:"Saving your listing data:\n\n❐ CURRENT OPTIONS:\n1. Take screenshots of your listings\n2. Copy listing text to a document\n3. Save listing photos to your device\n4. Keep records of all your transactions\n\n▲ SYSTEMATIC DATA EXPORT:\nFor organized data export, click the WhatsApp button below to contact support.\n\n➤ We're working on adding a data export feature in future updates!"},

  {c:"general", k:["thank you","thanks","appreciation","grateful","helpful","great help"],
   q:"Thank you!", a:"You're welcome! ☺ I'm glad I could help! If you have any more questions about buying, selling, or using Kentai Marketplace, feel free to ask anytime. I'm always here.\n\nFor personalized assistance, you can also click the WhatsApp button below to chat with our support team.\n\nHappy buying and selling on Kentai Marketplace! ▶"},

  {c:"general", k:["hello","hi","hey","greetings","good morning","good afternoon","good evening"],
   q:"Hello!", a:"Hello!  Welcome to Kentai Marketplace! I'm your intelligent assistant, ready to help you with anything buying, selling, stores, payments, safety, accounts, or general questions.\n\nWhat can I help you with today? Just type your question naturally!"},

  {c:"general", k:["help","what can you do","what do you do","how does this work","how can you help"],
   q:"How can you help me?", a:"I can help you with:\n\n▶ BUYING Searching, filtering, negotiating, inspecting items, staying safe\n● SELLING Creating listings, pricing, photos, promotions, fast selling tips\n■ STORES Creating and managing your store, adding products\n○ ACCOUNTS Login, registration, password reset, profile settings\n□ PAYMENTS Bank transfer, mobile money, cash, payment safety\n◆ SAFETY Avoiding scams, meeting safely, verifying items and sellers\n❔ GENERAL Platform info, features, rules, contact support\n\nJust type your question naturally, like you'd ask a friend!"},

  {c:"general", k:["goodbye","bye","see you","goodbye"],
   q:"Goodbye!", a:"Goodbye!  Thanks for using Kentai Marketplace. I'll be here whenever you need help. You can also click the WhatsApp button below to chat with our support team anytime. Have a great day and happy buying/selling!"},

  {c:"general", k:["how does kentai work","how it works","platform explanation","explain the marketplace","what is this"],
   q:"How does Kentai Marketplace work?", a:"Kentai Marketplace works like a digital Nigerian market:\n\n1. SELLERS post items with photos, descriptions, and prices (FREE)\n2. BUYERS browse or search for what they want\n3. BUYERS contact sellers directly via phone/WhatsApp\n4. They negotiate the price\n5. They meet at a safe public location\n6. Buyer inspects the item\n7. Payment is made (cash, transfer, mobile money)\n8. Item changes hands\n\n✓ No commission. No middleman. No fees. Just direct connection between buyers and sellers. Plus, you can create a Store for a professional shop presence!"},

  {c:"general", k:["is kentai safe","is it safe","platform safety","is kentai legit","is this real","trustworthy platform"],
   q:"Is Kentai Marketplace safe and legitimate?", a:"Yes! Kentai Marketplace is a legitimate platform.\n\nHowever, like ANY marketplace (Jumia, Jiji, Facebook Marketplace), safety depends on how YOU use it:\n\n✓ SAFE PRACTICES:\n• Meet in public places\n• Inspect items before paying\n• Verify seller identity when possible\n• Don't send money in advance\n• Trust your instincts\n• Report suspicious activity\n\n⚠ REMEMBER:\n• The platform connects individual buyers and sellers\n• Always follow safety best practices\n• Read our safety tips in this chat\n• Click the WhatsApp button below for urgent safety concerns."},

  {c:"general", k:["pwa","progressive web app","what is pwa","how does pwa work"],
   q:"What is a PWA?", a:"PWA = Progressive Web App\n\n❐ WHAT IT MEANS:\n• A website that works like a mobile app\n• No need to download from App Store or Play Store\n• Works on any device with a web browser\n• Can be added to your home screen\n• Updates automatically\n• Works offline (limited)\n• Uses less data than native apps\n\n❐ TO ADD TO HOME SCREEN:\n• Android (Chrome): Menu → 'Add to Home Screen'\n• iPhone (Safari): Share → 'Add to Home Screen'\n\n✓ It's like having an app without downloading one!"},

  {c:"general", k:["store benefits","why store","store advantage","store vs listing","store perks","why create a store"],
   q:"What are the benefits of having a store?", a:"Store benefits:\n\n1. PROFESSIONAL PRESENCE Branded page that looks trustworthy\n2. ORGANIZED PRODUCTS All items in one place\n3. FOLLOWER SYSTEM Build loyal customer base\n4. CREDIBILITY Stores are seen as more reliable\n5. REPEAT CUSTOMERS Easy for buyers to find you again\n6. BETTER VISIBILITY Higher in search results\n7. BRAND STORY Showcase who you are\n8. CONTACT INFO Prominently displayed\n9. FREE TO CREATE No cost at all\n10. INCREASED SALES All above factors lead to more sales\n\n➤ Even if you're just starting, a store makes you look professional!"},

  {c:"general", k:["can i trust","is it safe","safe platform","trust the platform","platform security"],
   q:"Can I trust Kentai Marketplace?", a:"Kentai Marketplace is a legitimate platform, but here's the honest truth:\n\n✓ WHAT WE PROVIDE:\n• Free platform for buying and selling\n• Direct connection between buyers and sellers\n• Store feature for professional sellers\n• Report system for suspicious activity\n• Admin support via WhatsApp\n\n⚠ WHAT YOU MUST DO:\n• Follow safety best practices\n• Meet in public places\n• Inspect items before paying\n• Don't send money in advance\n• Verify seller/buyer identity\n• Trust your instincts\n• Report suspicious activity\n\n➤ The platform is safe, but YOUR safety depends on following these practices. Just like any market in Nigeria be smart, be careful, be safe!"},

  {c:"general", k:["how to start","getting started","beginner","first time user","new to marketplace"],
   q:"I'm new how do I get started?", a:"Welcome! Here's your complete getting started guide:\n\n✶ STEP 1 CREATE ACCOUNT (2 minutes)\n• Click 'Sign Up' on homepage\n• Enter email and create password\n• Fill in your profile\n\n✶ STEP 2 BROWSE (Free, no account needed)\n• Use search bar to find items\n• Browse by category\n• Use filters to narrow results\n\n✶ STEP 3 BUY\n• Find an item you like\n• Contact seller via phone/WhatsApp\n• Negotiate price\n• Meet at safe location\n• Inspect and pay\n\n✶ STEP 4 SELL (Free!)\n• Click 'Sell' button\n• Fill in item details\n• Upload photos\n• Set price\n• Submit you're live!\n\n✶ STEP 5 CREATE STORE (Optional)\n• Click 'Store' in navigation\n• Set up your professional shop\n• Add products\n\nThat's it! Start with whatever you need first."},

  {c:"general", k:["listing limit","how many listings","unlimited","listing cap","maximum listings"],
   q:"Is there a limit on how many items I can list?", a:"No limit!\n\n✓ You can create as many listings as you want completely free.\n✓ No maximum number of items.\n✓ No restriction on categories.\n✓ No daily posting limit.\n\n➤ Tips for multiple listings:\n• Give each item a unique, descriptive title\n• Use different photos\n• Price each item individually\n• Consider a Store for organization if you have many items\n\nThe more listings you have, the more chances of sales!"},

  {c:"general", k:["listing quality","improve listing","better listing","listing optimization","seo listing"],
   q:"How do I make my listing stand out?", a:"Making your listing stand out:\n\n✶ PHOTOS (Most Important!)\n• 5+ clear, well-lit photos\n• Multiple angles\n• Show the item in use\n• Plain background\n\n✎ TITLE\n• Be specific: 'iPhone 13 Pro 256GB Space Grey Excellent Condition'\n• Include brand, model, key feature\n• Use keywords buyers search for\n\n✎ DESCRIPTION\n• Detailed and honest\n• Include all specs\n• Mention defects honestly (builds trust)\n• State what's included\n• Add your location\n\n● PRICE\n• Research competition\n• Price competitively\n• Add 'Negotiable' if flexible\n\n OTHER\n• List during peak hours (evenings)\n• Respond quickly to inquiries\n• Share on social media\n• Consider promoting the listing"},

  {c:"general", k:["negotiation tips","how to negotiate","bargaining tips","haggling tips","negotiation skills"],
   q:"How do I negotiate effectively?", a:"Negotiation tips for buyers and sellers:\n\n▶ FOR BUYERS:\n• Research market price first\n• Start with a reasonable offer (not too low)\n• Be polite and respectful\n• Mention if you can pay immediately\n• Point out any defects as negotiation points\n• Ask 'What's your best price?'\n• Be willing to walk away if price doesn't work\n\n● FOR SELLERS:\n• Price slightly above your minimum\n• Know your lowest acceptable price\n• Be firm but friendly\n• Explain why your price is fair (condition, accessories, etc.)\n• Offer small discounts for quick sales\n• Consider bundle deals for multiple items\n\n♣ GENERAL:\n• Negotiation is normal in Nigerian culture\n• Both parties should feel they got a fair deal\n• Don't be too aggressive\n• Meet in the middle\n• A completed sale at a slightly lower price is better than no sale"},

  {c:"general", k:["meeting tips","how to meet safely","safe exchange tips","meetup tips","exchange safety"],
   q:"Tips for safe meetings with sellers/buyers?", a:"Complete meeting safety guide:\n\n➤ WHERE TO MEET:\n• Police stations (safest many have exchange areas)\n• Shopping mall parking lots (busy, well-lit, cameras)\n• Bank parking lots (verify transfers easily)\n• Popular restaurants/cafes\n• Fuel stations with security\n\n WHEN TO MEET:\n• Daytime only (preferably 10 AM 6 PM)\n• Avoid night meetings\n• Weekday afternoons are often less crowded\n\n♣ WHO TO BRING:\n• A friend or family member\n• Tell someone where you're going\n• Share your live location with a trusted person\n\n✎ WHAT TO DO:\n• Inspect item THOROUGHLY before paying\n• Count cash carefully\n• Verify bank transfers on YOUR app\n• Get a receipt\n• Don't accept rides from strangers\n• Trust your instincts leave if uncomfortable\n\n❐ RED FLAGS LEAVE IMMEDIATELY IF:\n• Meeting location keeps changing\n• Seller/buyer is evasive or pushy\n• Something feels wrong\n• They refuse to meet in a public place"},

  {c:"general", k:["popular categories","best category","what sells best","most popular","top category"],
   q:"What are the most popular categories?", a:"Most popular categories on Kentai Marketplace:\n\n★ TOP CATEGORIES (by volume):\n1. Electronics (phones, laptops, accessories)\n2. Fashion (shoes, bags, clothing)\n3. Vehicles (cars, motorcycles)\n4. Home & Furniture\n5. Services\n6. Health & Beauty\n7. Food & Agriculture\n8. Real Estate\n\n▲ FASTEST SELLING:\n• Smartphones (especially iPhones and Samsung)\n• Sneakers and fashion accessories\n• Laptops for students\n• Home appliances\n\n➤ If you're selling, these categories have the most buyers. If you're buying, you'll find the most options here!"},

  {c:"general", k:["seller reputation","build reputation","good seller","seller rating","trust score"],
   q:"How do I build a good seller reputation?", a:"Building seller reputation:\n\n★ BE HONEST Accurate descriptions and photos build trust\n BE RESPONSIVE Reply within minutes, not hours\n♣ BE FAIR Reasonable prices, fair negotiation\n✶ BE PROFESSIONAL Good photos, clear descriptions\n◆ BE SAFE Meet in public, confirm payment\n❑ BE COMMUNICATIVE Answer questions thoroughly\n↺ BE CONSISTENT Regular listings, updated store\n❐ BE RELIABLE Deliver as promised, on time\n\n LONG-TERM:\n• Create a Store for professional presence\n• Encourage followers\n• Ask satisfied buyers to recommend you\n• Handle complaints professionally\n• Keep improving your listings\n\n➤ Your reputation is your most valuable asset on any marketplace!"},

  {c:"general", k:["buyer tips","how to be a good buyer","buyer etiquette","buying tips","smart buying"],
   q:"Tips for being a good buyer?", a:"Being a smart buyer:\n\n✧ RESEARCH Check multiple listings before deciding\n● BUDGET Set your budget before browsing\n✶ INSPECT Always see and test items before paying\n♣ NEGOTIATE It's normal and expected\n BE PROMPT Sellers appreciate quick responses\n➤ BE FLEXIBLE Meet at convenient locations\n❑ BE POLITE Professional communication gets better results\n◆ BE SAFE Follow all safety practices\n✎ BE ORGANIZED Know exactly what you're looking for\n✓ BE DECISIVE Don't waste the seller's time\n\n➤ Good buyers get better deals because sellers prefer working with them!"},

  {c:"general", k:["common mistakes","mistakes to avoid","what not to do","common errors","beginner mistakes"],
   q:"What are common mistakes people make?", a:"Common marketplace mistakes:\n\n✗ BUYER MISTAKES:\n• Not inspecting items before paying\n• Paying in advance without trust\n• Not negotiating (paying full price)\n• Meeting in unsafe locations\n• Not comparing prices across listings\n• Ignoring red flags\n\n✗ SELLER MISTAKES:\n• Poor quality photos\n• Vague or misleading descriptions\n• Overpricing without research\n• Being unresponsive to inquiries\n• Not being flexible on price\n• Accepting fake payment alerts\n• Meeting in unsafe locations\n\n✗ GENERAL MISTAKES:\n• Sharing too much personal information\n• Clicking suspicious links\n• Not keeping records of transactions\n• Not reading the marketplace rules\n• Not reporting scams\n\n➤ Avoiding these mistakes will make your experience much better!"},

  {c:"general", k:["tips","general tips","useful tips","helpful tips","marketplace tips","advice"],
   q:"Give me general tips for using the marketplace.", a:"Essential marketplace tips:\n\n▶ FOR BUYERS:\n• Search with specific keywords\n• Compare multiple listings\n• Always negotiate\n• Inspect before paying\n• Meet in public places\n• Trust your instincts\n\n● FOR SELLERS:\n• Take great photos (this is #1)\n• Write detailed descriptions\n• Price competitively\n• Be responsive\n• Be honest about condition\n• Refresh listings regularly\n\n■ FOR STORE OWNERS:\n• Keep products updated\n• Respond quickly\n• Build your brand\n• Encourage followers\n• Share on social media\n\n◆ FOR EVERYONE:\n• Never share personal financial info\n• Meet in safe locations\n• Keep records of transactions\n• Report suspicious activity\n• Read the terms and conditions\n\n➤ The marketplace works best when everyone follows these practices!"},

  {c:"general", k:["whatsapp","whatsapp number","contact whatsapp","admin whatsapp"],
   q:"What is the WhatsApp number?", a:"Kentai Marketplace Admin WhatsApp:\n\n➠ Please click the WhatsApp button below to start a chat with our support team.\n\nUse this for urgent support, account issues, complaints, or any question you need a human to answer. Available 9 AM to 8 PM, Monday to Saturday."},

  {c:"general", k:["how many questions","database size","how much do you know","knowledge base"],
   q:"How much do you know?", a:"I have a comprehensive knowledge base covering:\n\n✶ 200+ questions and answers across:\n• Buying (30+ topics)\n• Selling (40+ topics)\n• Store management (15+ topics)\n• Account & Platform (20+ topics)\n• Safety & Trust (15+ topics)\n• Payments (10+ topics)\n• General FAQ (30+ topics)\n• Conversational responses\n\nI can handle questions about electronics, fashion, vehicles, furniture, food, real estate, services, digital products, and much more. If I can't answer something specific, I'll guide you to the right resource or suggest clicking the WhatsApp button below to contact our admin."},

  {c:"general", k:["nigerian market","lagos market","local market","nigerian commerce","trade in nigeria"],
   q:"How does this compare to traditional Nigerian markets?", a:"Kentai Marketplace vs Traditional Markets:\n\n❐ KENTAI MARKETPLACE:\n• Available 24/7\n• Reach buyers/sellers across all Nigeria\n• Free to list\n• Search and filter easily\n• Compare prices instantly\n• No travel needed\n• Digital records of transactions\n\n■ TRADITIONAL MARKETS (Balogun, Ariaria, etc.):\n• Physical inspection possible\n• Immediate negotiation\n• Cash transactions\n• Limited to local area\n• Operating hours only\n• Travel required\n• No digital records\n\n➤ Kentai Marketplace combines the best of both digital convenience with the Nigerian trading culture of negotiation and direct connection!"},

  {c:"general", k:["store setup","how to set up store","store guide","complete store guide","store tutorial"],
   q:"Complete guide to setting up a store?", a:"Complete store setup guide:\n\n✎ STEP 1 PREPARE:\n• Decide your store name\n• Write a compelling description\n• Choose your category\n• Gather contact information\n• Prepare your social media links\n\n✎ STEP 2 CREATE:\n• Click 'Store' in navigation\n• Go to store-setup.html\n• Fill in all fields:\n  Store name\n  Description (what you sell, your story)\n  Category\n  Phone number\n  Email\n  Address\n  Website (optional)\n  Social media links\n• Submit\n\n✎ STEP 3 ADD PRODUCTS:\n• Go to store-upload.html\n• Add your first products\n• Use great photos and descriptions\n\n✎ STEP 4 PROMOTE:\n• Share your store link everywhere\n• Encourage followers\n• Keep adding products regularly\n• Respond quickly to inquiries\n\n➤ Your store is your digital shop treat it like a real business!"},

  {c:"general", k:["success story","success tips","made money","sold successfully","profitable selling"],
   q:"Tips for successful selling on the marketplace?", a:"Pro tips for successful selling:\n\n★ THE FORMULA:\nGreat Photos + Honest Description + Competitive Price + Fast Response = SALES\n\n✶ PHOTOS (40% of success):\n• Natural lighting\n• Multiple angles\n• Clean background\n• Show defects honestly\n\n✎ DESCRIPTION (25% of success):\n• Specific title\n• All specs included\n• Honest about condition\n• Keywords for search\n\n● PRICE (20% of success):\n• Research competition\n• Leave negotiation room\n• Be competitive\n\n RESPONSE (15% of success):\n• Reply within minutes\n• Be professional\n• Be flexible\n• Close deals quickly\n\n▲ BONUS TIPS:\n• Create a Store for credibility\n• Promote high-value items\n• Share on social media\n• List during peak hours\n• Keep listings fresh"},

  {c:"general", k:["faq","frequently asked","common questions","popular questions","what people ask"],
   q:"What are the most commonly asked questions?", a:"Most common questions on Kentai Marketplace:\n\n★ TOP 10:\n1. How do I buy an item?\n2. How do I sell an item?\n3. Is it free to list?\n4. How do I contact the seller?\n5. Can I negotiate the price?\n6. How do I stay safe?\n7. What payment methods are available?\n8. How do I create a store?\n9. How do I contact support?\n10. Is the platform safe?\n\n➤ You can ask me any of these questions (and many more!) right here in this chat. Or click the WhatsApp button below to chat with our support team for personalized help."}
];

// ============================================================
// ANSWER FINDING LOGIC
// ============================================================
function findBestAnswer(msg) {
  const m = msg.toLowerCase().trim();

  // WhatsApp redirect for "speak with someone" requests
  if (/(speak|talk|real person|human|live person|actual person|real human|speak to|talk to|chat with|call you|phone you|connect me|admin|support person)/i.test(m) &&
      !/(buy|sell|price|item|product|list|account|store|phone number|phone|electronic|gadget)/i.test(m.replace(/speak|talk|real|person|human|live|actual|chat|call|phone|connect|admin|support/gi, ''))) {
    return { a: "I understand you would like to speak with a real person! For personal assistance, please click the WhatsApp button below to chat with our customer support team. They will be happy to help you with anything. Available 9 AM to 8 PM, Monday to Saturday.", c: "redirect", r: true };
  }

  let best = null, bestScore = 0;

  for (const e of KB) {
    let score = 0;
    for (const k of e.k) {
      if (m.includes(k.toLowerCase())) score += k.split(' ').length * 2;
    }
    const qw = e.q.toLowerCase().replace(/[?.!,]/g,'').split(' ');
    for (const w of qw) {
      if (w.length > 3 && m.includes(w)) score += 1;
    }
    // Category boosts
    if (m.includes('buy') && e.c === 'buy') score += 3;
    if (m.includes('sell') && e.c === 'sell') score += 3;
    if (m.includes('store') && e.c === 'store') score += 2;
    if (m.includes('account') && e.c === 'account') score += 1;
    if (m.includes('safe') && (e.c === 'safety' || e.c === 'buy')) score += 3;
    if (m.includes('pay') && e.c === 'payments') score += 3;
    if (score > bestScore) { bestScore = score; best = e; }
  }

  if (bestScore >= 3 && best) {
    return { a: best.a, c: best.c, r: false, q: best.q };
  }

  // Fallback
  const fb = [
    "I'm here to help! I can answer questions about:\n\n▶ Buying items (searching, filtering, negotiating, safety)\n● Selling items (creating listings, pricing, photos, promotions)\n■ Creating and managing a Store\n○ Account issues (login, registration, password)\n□ Payment methods and safety\n◆ Safety tips and scam prevention\n\nCould you rephrase your question? Or click the WhatsApp button below to contact our admin.",
    "I'd love to help! You can ask me about:\n\n• How to buy items\n• How to sell items\n• How to create a store\n• Payment methods\n• Safety tips\n• Account management\n\nIf your question isn't covered, click the WhatsApp button below to reach our admin.",
    "Great question! I can help with most marketplace topics. Try asking about buying, selling, stores, payments, or safety. For specialized help, click the WhatsApp button below to contact our admin."
  ];
  return { a: fb[Math.floor(Math.random()*fb.length)], c: "general", r: false };
}

// ============================================================
// CHATBOT UI CREATION
// ============================================================
function createChatbot() {
  const c = document.createElement('div');
  c.id = 'kentai-agent';
  c.innerHTML = `
    <button id="ka-toggle" style="position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#f68b1e,#e8790f);color:#fff;border:none;cursor:pointer;z-index:99999;box-shadow:0 4px 15px rgba(246,139,30,.4);display:flex;align-items:center;justify-content:center;transition:all .3s;animation:ka-pulse 2s infinite;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </button>
    <div id="ka-window" style="display:none;position:fixed;bottom:96px;right:24px;width:380px;max-width:calc(100vw - 48px);height:540px;max-height:calc(100vh - 140px);background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.15);z-index:99999;flex-direction:column;overflow:hidden;border:1px solid #e2e8f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="background:linear-gradient(135deg,#f68b1e,#e8790f);color:#fff;padding:16px 20px;display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f68b1e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div style="flex:1;"><div style="font-weight:700;font-size:15px;">Kentai Assistant</div><div style="font-size:11px;opacity:.9;display:flex;align-items:center;gap:4px;"><span style="width:6px;height:6px;background:#4ade80;border-radius:50%;display:inline-block;"></span>Online Ask me anything!</div></div>
        <button id="ka-close" style="background:none;border:none;color:#fff;cursor:pointer;padding:4px;opacity:.8;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      </div>
      <div id="ka-quick" style="padding:8px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;flex-wrap:wrap;gap:6px;">
        <button class="ka-q" data-m="How do I buy an item?" style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:6px 12px;font-size:11px;color:#475569;cursor:pointer;white-space:nowrap;">▶ Buy items</button>
        <button class="ka-q" data-m="How do I sell an item?" style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:6px 12px;font-size:11px;color:#475569;cursor:pointer;white-space:nowrap;">● Sell items</button>
        <button class="ka-q" data-m="How do I create a store?" style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:6px 12px;font-size:11px;color:#475569;cursor:pointer;white-space:nowrap;">■ Create store</button>
        <button class="ka-q" data-m="How do I stay safe?" style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:6px 12px;font-size:11px;color:#475569;cursor:pointer;white-space:nowrap;">◆ Safety</button>
        <button class="ka-q" data-m="What payment methods are there?" style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:6px 12px;font-size:11px;color:#475569;cursor:pointer;white-space:nowrap;">□ Payments</button>
        <button id="ka-quick-wa" style="background:#fff;border:1px solid #25D366;border-radius:20px;padding:6px 12px;font-size:11px;color:#25D366;cursor:pointer;white-space:nowrap;">❐ WhatsApp</button>
      </div>
      <div id="ka-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;background:#f8fafc;">
        <div style="display:flex;gap:8px;align-items:flex-start;">
          <div style="width:28px;height:28px;background:linear-gradient(135deg,#f68b1e,#e8790f);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div style="background:#fff;padding:10px 14px;border-radius:4px 12px 12px 12px;box-shadow:0 1px 3px rgba(0,0,0,.08);max-width:85%;">
            <p style="margin:0;font-size:13px;color:#334155;line-height:1.5;">Hello! Welcome to <strong>Kentai Marketplace</strong>! I am your intelligent assistant. I can help you with buying, selling, stores, payments, safety, and more. What would you like to know?</p>
            <p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">Prefer a real person? Click the WhatsApp button below!</p>
          </div>
        </div>
      </div>
      <div style="padding:12px 16px;background:#fff;border-top:1px solid #e2e8f0;display:flex;gap:8px;align-items:center;">
        <input type="text" id="ka-input" placeholder="Type your question..." style="flex:1;border:1px solid #e2e8f0;border-radius:24px;padding:10px 16px;font-size:13px;outline:none;color:#334155;background:#f8fafc;" />
        <button id="ka-send" style="background:linear-gradient(135deg,#f68b1e,#e8790f);color:#fff;border:none;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;box-shadow:0 2px 8px rgba(246,139,30,.3);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
      <div style="padding:8px 16px 12px;background:#fff;text-align:center;">
        <button id="ka-wa-btn" style="display:inline-flex;align-items:center;gap:6px;background:#25D366;color:#fff;padding:6px 14px;border-radius:20px;font-size:11px;text-decoration:none;font-weight:600;border:none;cursor:pointer;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat with Customer Support
        </button>
      </div>
    </div>`;

  // Inject styles
  const s = document.createElement('style');
  s.textContent = `
    @keyframes ka-pulse{0%{box-shadow:0 4px 15px rgba(246,139,30,.4)}50%{box-shadow:0 4px 25px rgba(246,139,30,.6)}100%{box-shadow:0 4px 15px rgba(246,139,30,.4)}}
    @keyframes ka-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
    @keyframes ka-fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    #ka-messages::-webkit-scrollbar{width:4px}
    #ka-messages::-webkit-scrollbar-track{background:transparent}
    #ka-messages::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
    .ka-q:hover{background:#fef3e2!important;border-color:#f68b1e!important;color:#f68b1e!important}
    #ka-toggle:hover{transform:scale(1.05)}
  `;
  document.head.appendChild(s);
  document.body.appendChild(c);

  // Logic
  const toggle = document.getElementById('ka-toggle');
  const win = document.getElementById('ka-window');
  const closeBtn = document.getElementById('ka-close');
  const sendBtn = document.getElementById('ka-send');
  const inputEl = document.getElementById('ka-input');
  const msgsEl = document.getElementById('ka-messages');
  let open = false;

  toggle.onclick = () => { open = !open; win.style.display = open ? 'flex' : 'none'; if (open) inputEl.focus(); };
  closeBtn.onclick = () => { open = false; win.style.display = 'none'; };

  function send(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    inputEl.value = '';
    showTyping();
    setTimeout(() => {
      removeTyping();
      const r = findBestAnswer(text);
      addMsg(r.a, 'agent', r.r);
    }, 500 + Math.random() * 500);
  }

  sendBtn.onclick = () => send(inputEl.value);
  inputEl.onkeydown = e => { if (e.key === 'Enter') send(inputEl.value); };
  document.querySelectorAll('.ka-q').forEach(b => b.onclick = function() { send(b.getAttribute('data-m')); });
  var quickWa = document.getElementById('ka-quick-wa');
  if (quickWa) quickWa.onclick = openWAConfirm;

  function addMsg(text, who, isRedirect) {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px;align-items:' + (who === 'user' ? 'flex-end' : 'flex-start') + ';animation:ka-fadeIn .3s ease;';
    if (who === 'user') {
      d.innerHTML = '<div style="background:linear-gradient(135deg,#f68b1e,#e8790f);color:#fff;padding:10px 14px;border-radius:12px 4px 12px 12px;box-shadow:0 1px 3px rgba(0,0,0,.08);max-width:85%;"><p style="margin:0;font-size:13px;line-height:1.5;">' + esc(text) + '</p></div>';
    } else {
      const html = isRedirect ? fmtRedirect(text) : fmtAgent(text);
      d.innerHTML = '<div style="width:28px;height:28px;background:linear-gradient(135deg,#f68b1e,#e8790f);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div style="background:#fff;padding:10px 14px;border-radius:4px 12px 12px 12px;box-shadow:0 1px 3px rgba(0,0,0,.08);max-width:85%;">' + html + '</div>';
    }
    msgsEl.appendChild(d);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function fmtAgent(t) {
    let h = esc(t);
    h = h.replace(/\n/g, '<br>');
    return '<p style="margin:0;font-size:13px;color:#334155;line-height:1.6;">' + h + '</p>';
  }

  function fmtRedirect(t) {
    let h = esc(t);
    h = h.replace(/\n/g, '<br>');
    return '<p style="margin:0;font-size:13px;color:#334155;line-height:1.6;">' + h + '</p><button onclick="openWAConfirm()" style="display:inline-flex;align-items:center;gap:6px;background:#25D366;color:#fff;padding:8px 16px;border-radius:20px;font-size:12px;font-weight:600;margin-top:8px;border:none;cursor:pointer;"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Chat with Customer Support</button>';
  }

  function showTyping() {
    const t = document.createElement('div');
    t.id = 'ka-typing';
    t.style.cssText = 'display:flex;gap:8px;align-items:flex-start;';
    t.innerHTML = '<div style="width:28px;height:28px;background:linear-gradient(135deg,#f68b1e,#e8790f);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div style="background:#fff;padding:12px 16px;border-radius:4px 12px 12px 12px;box-shadow:0 1px 3px rgba(0,0,0,.08);"><div style="display:flex;gap:4px;"><span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:ka-bounce 1.4s infinite 0s;"></span><span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:ka-bounce 1.4s infinite .2s;"></span><span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:ka-bounce 1.4s infinite .4s;"></span></div></div>';
    msgsEl.appendChild(t);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('ka-typing');
    if (t) t.remove();
  }

  function esc(t) {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
  }
}

// WhatsApp confirmation popup
function openWAConfirm() {
  if (document.getElementById('ka-wa-overlay')) return;
  var overlay = document.createElement('div');
  overlay.id = 'ka-wa-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:100000;display:flex;align-items:center;justify-content:center;';
  overlay.innerHTML = '<div style="background:#fff;border-radius:16px;padding:28px 24px;max-width:340px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,.3);text-align:center;animation:ka-fadeIn .3s ease;">'+
    '<div style="width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">'+
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'+
    '</div>'+
    '<h3 style="margin:0 0 8px;font-size:17px;color:#1e293b;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;">Chat with Customer Support?</h3>'+
    '<p style="margin:0 0 20px;font-size:13px;color:#64748b;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;">You will be redirected to WhatsApp to chat with the Kentai Marketplace admin.</p>'+
    '<div style="display:flex;gap:10px;justify-content:center;">'+
    '<button id="ka-wa-cancel" style="flex:1;padding:10px 20px;border-radius:10px;border:1px solid #e2e8f0;background:#fff;color:#64748b;font-size:14px;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;">Cancel</button>'+
    '<button id="ka-wa-ok" style="flex:1;padding:10px 20px;border-radius:10px;border:none;background:#25D366;color:#fff;font-size:14px;cursor:pointer;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;">OK</button>'+
    '</div>'+
    '</div>';
  document.body.appendChild(overlay);
  overlay.onclick = function(e) { if (e.target === overlay) closeWAConfirm(); };
  document.getElementById('ka-wa-cancel').onclick = closeWAConfirm;
  document.getElementById('ka-wa-ok').onclick = function() {
    closeWAConfirm();
    window.open('https://wa.me/2347049412363', '_blank');
  };
}

function closeWAConfirm() {
  var el = document.getElementById('ka-wa-overlay');
  if (el) el.remove();
}

// Init
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function() { createChatbot(); setupWAEvents(); });
else { createChatbot(); setupWAEvents(); }

function setupWAEvents() {
  var waBtn = document.getElementById('ka-wa-btn');
  if (waBtn) {
    waBtn.onclick = openWAConfirm;
    waBtn.ontouchend = function(e) { e.preventDefault(); openWAConfirm(); };
  }
  var quickWa = document.getElementById('ka-quick-wa');
  if (quickWa) {
    quickWa.onclick = openWAConfirm;
    quickWa.ontouchend = function(e) { e.preventDefault(); openWAConfirm(); };
  }
}

})();
